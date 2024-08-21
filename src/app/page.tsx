"use client";
import { client } from "@/client/client";
import { BarChart } from "@/components/chart/BarChart";
import { UKHSADataPoint } from "@/server/server";
import { ChartCard } from "@/components/chart/ChartCard";

export default function Home() {
  const { data: casesEngland, isLoading: isEnglandLoading } =
    client.covidCasesEngland.useQuery();
  const { data: casesNorthWest, isLoading: isNorthWestLoading } =
    client.covidCasesNorthWest.useQuery();

  return (
    <main>
      <ChartCard
        title="COVID-19 Last week new cases in England"
        loading={isEnglandLoading}
      >
        <BarChart<UKHSADataPoint>
          data={casesEngland!}
          xField="date"
          xLabel="Date"
          yField="metric_value"
          yLabel="Cases"
        />
      </ChartCard>

      <br />

      <ChartCard
        title="COVID-19 Last week new cases in North West England"
        loading={isNorthWestLoading}
      >
        <BarChart<UKHSADataPoint>
          data={casesNorthWest!}
          xField="date"
          xLabel="Date"
          yField="metric_value"
          yLabel="Cases"
        />
      </ChartCard>
    </main>
  );
}
