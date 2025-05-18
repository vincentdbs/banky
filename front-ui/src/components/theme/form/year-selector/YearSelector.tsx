import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@lib/shadcn/select';
import { FIRST_YEAR } from '@utils/number/NumberUtils';
import React from 'react';

/**
 * YearSelector component provides a dropdown to select a year
 * Displays a range of years centered on the current year
 */
type YearSelectorProps = {
  selectedYear: number,
  setSelectedYear: (year: number) => void,
  yearRange?: number,
  firstYear?: number,
};

type Option = {
  value: number,
  label: string,
};

export default function YearSelector(
  {
    selectedYear,
    setSelectedYear,
    yearRange = 2,
    firstYear = FIRST_YEAR,
  }: YearSelectorProps,
) {
  // Generate year options (current year and specified range before/after)
  const years: Option[] = React.useMemo(() => Array.from({ length: yearRange }, (_: unknown, i: number) => {
    const year: number = firstYear + i;
    return {
      value: year,
      label: year.toString(),
    };
  }), [yearRange, firstYear]);

  return (
    <Select
      value={selectedYear.toString()}
      onValueChange={(year: string) => setSelectedYear(parseInt(year, 10))}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select year" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year: Option) => (
          <SelectItem key={year.value} value={year.value.toString()}>
            {year.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
