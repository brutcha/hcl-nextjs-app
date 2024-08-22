"use client";
import Badge from "antd/lib/badge";
import Button from "antd/lib/button/button";
import Space from "antd/lib/space";
import Text from "antd/lib/typography/Text";
import {
  AlignLeftOutlined,
  DownloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { client } from "@/client/client";
import { BarChart } from "@/components/chart/BarChart";
import { UKHSADataPoint } from "@/server/server";
import { ChartCard } from "@/components/chart/ChartCard";
import { ChartGrid } from "@/components/chart/ChartGrid";
import { PageLayout } from "@/components/layout/PageLayout";

export default function Home() {
  const { data: casesEngland, isLoading: isEnglandLoading } =
    client.covidCasesEngland.useQuery();
  const { data: casesNorthWest, isLoading: isNorthWestLoading } =
    client.covidCasesNorthWest.useQuery();

  return (
    <PageLayout
      title="Page Title"
      actions={[
        <Button key="export" icon={<DownloadOutlined />} iconPosition="end">
          Export to PDF
        </Button>,
        <Button key="notes" icon={<AlignLeftOutlined />} iconPosition="end">
          Notes <Text type="secondary">(3)</Text>
        </Button>,
        <Button key="notes" icon={<FilterOutlined />} iconPosition="end">
          <Space>
            <>Filters</>
            <Badge count={15} overflowCount={9} color="blue" />
          </Space>
        </Button>,
      ]}
    >
      <ChartGrid>
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
      </ChartGrid>
    </PageLayout>
  );
}
