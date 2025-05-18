/**
 * Component that displays a stacked bar chart of account totals by month.
 * Each bar represents a month and each segment represents an account's amount for that month.
 * Checking accounts are grouped together into a single "checking" entry.
 */
import { AccountType } from '@api/accounts/AccountsTypes';
import { YearlyAccountTotalsResponse } from '@api/evolution/YearlyAccountTotalsTypes';
import useMessages from '@i18n/hooks/messagesHook';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@lib/shadcn/chart';
import { formatDecimalPrice, formatEuroDecimalPrice } from '@utils/number/NumberUtils';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type YearlyAccountTotalsGraphProps = {
  yearlyTotals: YearlyAccountTotalsResponse,
  isLoading?: boolean,
};

// Set of colors to be used for different accounts
const ACCOUNT_COLORS = [
  '#f8d266',
  '#afcaf7',
  '#eda19b',
  '#3fb179',
  '#90d7dd',
  '#cd83dc',
  '#6fc49b',
];

export default function YearlyAccountTotalsGraph(
  {
    yearlyTotals,
  }: YearlyAccountTotalsGraphProps,
) {
  const { messages: { label: { checking } } } = useMessages();

  // Transform the API response data into a format suitable for the chart
  const { chartData, chartConfig, accountKeys } = useMemo(() => {
    const data = Object
      .entries(yearlyTotals)
      .sort(([firstMonth], [secondMonth]) => dayjs(firstMonth).diff(dayjs(secondMonth)))
      .map(([key, value]) => {
        return {
          month: dayjs(key).format('MMM'),
          ...value.reduce((acc: Record<string, number>, { accountName, total, accountType }) => {
            // Group checking accounts under a single "checking" label
            const label = accountType === AccountType.CHECKING ? checking : accountName;
            const currentTotal = parseInt(total);
            const existingTotal = acc[label] ?? 0;

            return {
              ...acc,
              [label]: existingTotal + currentTotal,
            };
          }, {}),
        };
      });

    // Process first month's data to get unique accounts after grouping
    const firstMonthData = Object.values(yearlyTotals)[0];

    // Create a map to track unique accounts after checking accounts are grouped
    const uniqueAccountsMap = new Map<string, { label: string, color: string }>();

    // Process each account, grouping checking accounts under the CHECKING_LABEL
    firstMonthData.forEach(({ accountName, accountType }) => {
      const label = accountType === AccountType.CHECKING ? checking : accountName;
      if (!uniqueAccountsMap.has(label)) {
        uniqueAccountsMap.set(label, {
          label,
          color: ACCOUNT_COLORS[uniqueAccountsMap.size % ACCOUNT_COLORS.length],
        });
      }
    });

    // Create chart configuration from the processed unique accounts
    const config: ChartConfig = Object.fromEntries(uniqueAccountsMap.entries());

    // Get keys in deterministic order
    const keys = Array.from(uniqueAccountsMap.keys());

    return {
      chartData: data,
      chartConfig: config,
      accountKeys: keys,
    };
  }, [yearlyTotals, checking]);

  return (
    <ChartContainer config={chartConfig}>
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value: string) => value.slice(0, 3)}
          />
          <YAxis
            tickFormatter={(value: number) => {
              console.log('value', value);
              return formatEuroDecimalPrice(value);
            }}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          {accountKeys.map((accountName: string, index: number) => (
            <Bar
              key={accountName}
              dataKey={accountName}
              stackId="a"
              fill={ACCOUNT_COLORS[index % ACCOUNT_COLORS.length]}
              radius={index === 0 ? [4, 4, 0, 0] : index === accountKeys.length - 1 ? [0, 0, 4, 4] : [0, 0, 0, 0]}
            />
          ))}
        </BarChart>
    </ChartContainer>
  );
}