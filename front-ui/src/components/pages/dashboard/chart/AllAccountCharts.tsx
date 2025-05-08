'use client';

import { Button } from '@lib/shadcn/button';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@lib/shadcn/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import {
  Bar, BarChart, CartesianGrid, XAxis,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/lib/shadcn/chart';
import useMessages from '@/i18n/hooks/messagesHook';

const xAxisKey = 'month';

type ChartData = {
  month: number,
  color: string,
  [key: string]: number | string,
};

const chartConfig: Record<string, any> = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
  test: {
    label: 'Test',
    color: '#00ff00',
  },
} satisfies ChartConfig;

type AllAccountChartsProps = {
  data: ChartData[],
};

function computeRadius(index: number, length: number): [number, number, number, number] {
  if (index === 0) {
    return [0, 0, 4, 4];
  }
  if (index === length - 1) {
    return [4, 4, 0, 0];
  }
  return [0, 0, 0, 0];
}

export function AllAccountCharts({ data }: AllAccountChartsProps) {
  const { messages } = useMessages();
  const numberDataByBar: number = Object.keys(data[0]).filter((key: string) => key !== xAxisKey).length;

  return (
    <Card className="col-span-4 h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <p>{messages.dashboard.charts.title}</p>
          <div className="space-x-1">
            <Button variant="outline" type="button">
              <ChevronLeft />
            </Button>
            <Button type="button" variant="outline">
              <ChevronRight />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value
                // return  value.slice(0, data.length);
              }
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <>
              {
                Object
                  .entries(data[0])
                  .filter(([key]) => key !== xAxisKey)
                  .map(([key, value], index) => {
                    console.log(value);
                    return (
                      <Bar
                        key={key}
                        dataKey={key}
                        stackId="a"
cd
                        fill={`var(--color-${value})`}
                        radius={computeRadius(index, numberDataByBar)}
                      />
                    );
                  })
              }
            </>
            {/* <Bar */}
            {/*  dataKey="desktop" */}
            {/*  stackId="a" */}
            {/*  fill="var(--color-desktop)" */}
            {/*  radius={[0, 0, 4, 4]} */}
            {/* /> */}
            {/* <Bar */}
            {/*  dataKey="mobile" */}
            {/*  stackId="a" */}
            {/*  fill="var(--color-mobile)" */}
            {/*  radius={[4, 4, 0, 0]} */}
            {/* /> */}
            {/* <Bar */}
            {/*  dataKey="mobile" */}
            {/*  stackId="a" */}
            {/*  fill="var(--color-mobile)" */}
            {/*  radius={[4, 4, 0, 0]} */}
            {/* /> */}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
