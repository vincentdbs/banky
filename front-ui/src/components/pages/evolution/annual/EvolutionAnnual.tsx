import { AnnualTotal, YearSummary } from '@api/evolution/TreasuryEvolutionTypes';
import MainSection from '@components/theme/sections/MainSection';
import dayjs from 'dayjs';
import React from 'react';
import EvolutionAnnualTable from './components/EvolutionAnnualTable';

type EvolutionAnnualProps = {
  year?: number,
  annualTotal?: AnnualTotal,
  yearSummary?: YearSummary,
};

/**
 * A component that displays an annual evolution table for financial accounts,
 * showing monthly values and gain/loss metrics grouped by account type.
 */
export default function EvolutionAnnual(
  {
    year = dayjs().year(),
    annualTotal = {},
    yearSummary = { total: 0, gainLoss: 0, interest: 0 },
  }: EvolutionAnnualProps,
) {
  const createMonthDates = (year: number): string[] => {
    return Array.from({ length: 12 }, (_, i: number) => {
      return dayjs(new Date(year, i, 1)).format('YYYY-MM-DD');
    });
  };

  // Create an array of month dates for the year in chronological order
  const monthDates: string[] = createMonthDates(year);

  return (
    <MainSection>
      <div className="w-full min-w-[1200px] rounded-md border text-sm grid overflow-auto">
        <EvolutionAnnualTable
          year={year}
          monthDates={monthDates}
          annualTotal={annualTotal}
        />
      </div>
    </MainSection>
  );
}