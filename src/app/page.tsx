"use client";
import Space from "antd/lib/space";
import Divider from "antd/lib/divider";
import { client } from "@/client/client";

export default function Home() {
  const { data: casesEngland } = client.covidCasesEngland.useQuery();
  const { data: casesNorthWest } = client.covidCasesNorthWest.useQuery();

  return (
    <main>
      <Space
        direction="horizontal"
        style={{
          alignItems: "stretch",
        }}
      >
        <pre>{JSON.stringify(casesEngland, null, 2)}</pre>
        <Divider type="vertical" style={{ height: "100%" }} />
        <pre>{JSON.stringify(casesNorthWest, null, 2)}</pre>
      </Space>
    </main>
  );
}
