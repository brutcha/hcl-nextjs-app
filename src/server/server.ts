import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  healthcheck: publicProcedure.query(async () => {
    return "alive";
  }),
});

export type AppRouter = typeof appRouter;
