import YearlyAccountTotalsGraph
  from '@components/pages/evolution/yearly-totals/graph/YearlyAccountTotalsGraph';
import YearSelector from '@components/theme/form/year-selector/YearSelector';
import useYearlyAccountTotals from '@hooks/use-yearly-account-totals/useYearlyAccountTotals';
import useMessages from '@i18n/hooks/messagesHook';
import { FIRST_YEAR } from '@utils/number/NumberUtils';
import { isNotNullish } from '@utils/types/TypesUtils';
import dayjs from 'dayjs';
import React from 'react';
import MainSection from '@/components/theme/sections/MainSection';

/**
 * Component for displaying yearly account totals
 * Shows account totals for a selected year by month
 */
export default function YearlyAccountTotals() {
  const { messages } = useMessages();
  const {
    yearlyTotals,
    selectedYear,
    handleYearChange,
    isLoading,
  } = useYearlyAccountTotals();

  return (
    <MainSection>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{messages.evolution.yearlyTotals.title}</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="year-select" className="text-sm font-medium">
            {messages.evolution.yearlyTotals.selectYear}:
          </label>
          <YearSelector
            selectedYear={selectedYear}
            setSelectedYear={handleYearChange}
            yearRange={dayjs().year() - FIRST_YEAR + 1}
          />
        </div>
      </div>
      {
        !isLoading && isNotNullish(yearlyTotals) && (
          <YearlyAccountTotalsGraph
            yearlyTotals={yearlyTotals}
          />
        )
      }
    </MainSection>
  );
}
