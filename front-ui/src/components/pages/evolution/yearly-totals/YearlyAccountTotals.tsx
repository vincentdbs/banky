import YearlyAccountTotalsGraph
  from '@components/pages/evolution/yearly-totals/graph/YearlyAccountTotalsGraph';
import useMessages from '@i18n/hooks/messagesHook';
import { isNotNullish } from '@utils/types/TypesUtils';
import React from 'react';
import useYearlyAccountTotals from '@hooks/use-yearly-account-totals/useYearlyAccountTotals';
import { FIRST_YEAR } from '@utils/number/NumberUtils';
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

  // Generate years for the dropdown (from FIRST_YEAR to current year)
  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - FIRST_YEAR + 1 }, (_, i) => currentYear - i);
  }, []);

  return (
    <MainSection>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{messages.evolution.yearlyTotals.title}</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="year-select" className="text-sm font-medium">
            {messages.evolution.yearlyTotals.selectYear}:
          </label>
          <select
            id="year-select"
            className="border rounded p-1 text-sm"
            value={selectedYear}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleYearChange(Number(e.target.value))}
          >
            {years.map((year: number) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        {
          !isLoading && isNotNullish(yearlyTotals) && (
            <YearlyAccountTotalsGraph
              yearlyTotals={yearlyTotals}
            />
          )
        }
      </div>
    </MainSection>
  );
}
