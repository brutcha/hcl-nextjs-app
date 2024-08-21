"use client";
import Space from "antd/lib/space";
import Spin from "antd/lib/spin";
import Divider from "antd/lib/divider";
import { client } from "@/client/client";
import { BarChart } from "@/components/graph/BarChart";
import { UKHSADataPoint } from "@/server/server";

export default function Home() {
  const { data: casesEngland, isLoading: isEnglandLoading } =
    client.covidCasesEngland.useQuery();
  const { data: casesNorthWest, isLoading: isNorthWestLoading } =
    client.covidCasesNorthWest.useQuery();

  return (
    <main>
      <Space
        direction="horizontal"
        style={{
          alignItems: "stretch",
        }}
      >
        {isEnglandLoading ? (
          <Spin />
        ) : (
          <BarChart<UKHSADataPoint>
            data={casesEngland!}
            xField="date"
            xLabel="Date"
            yField="metric_value"
            yLabel="Cases"
          />
        )}

        <Divider type="vertical" style={{ height: "100%" }} />

        {isNorthWestLoading ? (
          <Spin />
        ) : (
          <BarChart<UKHSADataPoint>
            data={casesNorthWest!}
            xField="date"
            xLabel="Date"
            yField="metric_value"
            yLabel="Cases"
          />
        )}
      </Space>
    </main>
  );
}
