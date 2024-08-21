import { publicProcedure, router } from "./trpc";
import { z } from "zod";

const UKHSA_BASE_URL = "https://api.ukhsa-dashboard.data.gov.uk";
const COVID_URL =
  "themes/infectious_disease/sub_themes/respiratory/topics/COVID-19";
const ENGLAND_URL = "geography_types/Nation/geographies/England";
const NORTH_WEST_URL =
  "geography_types/UKHSA%20Region/geographies/North%20West";
const COVID_CASES = "metrics/COVID-19_cases_casesByDay";

const getWeekNumber = (date: Date) => {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayOfYear = (today.getTime() - onejan.getTime()) / 86400000;
  return Math.ceil(dayOfYear / 7);
};

const getLastWeekQueryParams = () => {
  const now = new Date();
  const weekNumber = getWeekNumber(now);
  const year = now.getFullYear();

  return {
    year: `${weekNumber === 0 ? year - 1 : year}`,
    epiweek: `${weekNumber === 0 ? 52 : weekNumber - 1}`,
    page_size: "7",
  };
};

const DataPointSchema = z
  .object({
    theme: z.string(),
    sub_theme: z.string(),
    topic: z.string(),
    geography_type: z.string(),
    geography: z.string(),
    geography_code: z.string(),
    metric_group: z.string(),
    metric: z.string(),
    stratum: z.string(),
    sex: z.string(),
    age: z.string(),
    year: z.number(),
    month: z.number(),
    epiweek: z.number(),
    date: z.string(),
    metric_value: z.number(),
    in_reporting_delay_period: z.boolean(),
  })
  .required();

const UKHSADataSchema = z.object({
  count: z.number(),
  prev: z.string().nullable().optional(),
  next: z.string().nullable().optional(),
  results: z.array(DataPointSchema),
});

export const appRouter = router({
  healthcheck: publicProcedure.query(async () => {
    return "alive";
  }),
  covidCasesEngland: publicProcedure.query(async () => {
    const queryParams = new URLSearchParams({
      ...getLastWeekQueryParams(),
    });

    const { success, data } = UKHSADataSchema.safeParse(
      await (
        await fetch(
          `${UKHSA_BASE_URL}/${COVID_URL}/${ENGLAND_URL}/${COVID_CASES}?${queryParams}`,
        )
      ).json(),
    );

    if (!success) {
      throw new Error("Failed to parse UKHSA data");
    }

    return data?.results;
  }),
  covidCasesNorthWest: publicProcedure.query(async () => {
    const queryParams = new URLSearchParams({
      ...getLastWeekQueryParams(),
    });

    const { success, data } = UKHSADataSchema.safeParse(
      await (
        await fetch(
          `${UKHSA_BASE_URL}/${COVID_URL}/${NORTH_WEST_URL}/${COVID_CASES}?${queryParams}`,
        )
      ).json(),
    );

    if (!success) {
      throw new Error("Failed to parse UKHSA data");
    }

    return data?.results;
  }),
});

export type AppRouter = typeof appRouter;
