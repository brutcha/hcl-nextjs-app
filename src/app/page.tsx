"use client";
import Space from "antd/lib/space";
import Spin from "antd/lib/spin";
import Divider from "antd/lib/divider";
import { client } from "@/client/client";

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
          <pre>{JSON.stringify(casesEngland, null, 2)}</pre>
        )}

        <Divider type="vertical" style={{ height: "100%" }} />

        {isNorthWestLoading ? (
          <Spin />
        ) : (
          <pre>{JSON.stringify(casesNorthWest, null, 2)}</pre>
        )}
      </Space>
    </main>
  );
}
