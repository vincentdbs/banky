import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@lib/shadcn/select';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

/**
 * MonthSelector component provides a dropdown to select a month
 * Displays month names and returns the month index (0-11) as a string
 */
type MonthSelectorProps = {
  selectedMonth: number, // 0 to 11
  setSelectedMonth: (month: number) => void,
};

export default function MonthSelector(
  {
    selectedMonth,
    setSelectedMonth,
  }: MonthSelectorProps,
) {
  // Generate month options
  const months: { value: number, label: string }[] = React.useMemo(() => Array.from({ length: 12 }, (_: unknown, i: number) => {
    const date: Dayjs = dayjs().month(i).startOf('month');
    return {
      value: i,
      label: date.format('MMMM'),
    };
  }), []);

  return (
    <Select
      value={selectedMonth.toString()}
      onValueChange={(month: string) => setSelectedMonth(parseInt(month, 10))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select month" />
      </SelectTrigger>
      <SelectContent>
        {months.map((month: { value: number, label: string }) => (
          <SelectItem key={month.value} value={month.value.toString()}>
            {month.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
