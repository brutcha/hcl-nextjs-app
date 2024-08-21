"use client";
import { useCallback, useEffect, useRef } from "react";
import { Chart } from "@antv/g2";

interface BarChartProps<d extends Record<string, unknown>> {
  data: d[];
  xField: keyof d;
  xLabel: string;
  yField: keyof d;
  yLabel: string;
}

export const BarChart = <d extends Record<string, unknown>>({
  data,
  xField,
  xLabel,
  yField,
  yLabel,
}: BarChartProps<d>) => {
  const container = useRef<HTMLDivElement>(null);
  const chart = useRef<Chart | null>(null);

  const renderBarChart = useCallback(
    (container: HTMLDivElement) => {
      if (chart.current === null) {
        chart.current = new Chart({ container });
      }

      chart.current
        .interval()
        .tooltip({
          items: [{ name: yLabel, field: yField as string }],
        })
        .data(data)
        .data(data)
        .encode("x", xField)
        .axis("x", { title: xLabel })
        .encode("y", yField)
        .axis("y", { title: yLabel });

      chart.current.render();
    },
    [data, xField, xLabel, yField, yLabel],
  );

  useEffect(() => {
    if (container.current) {
      renderBarChart(container.current);
    }
  }, [renderBarChart]);

  return <div ref={container}></div>;
};
