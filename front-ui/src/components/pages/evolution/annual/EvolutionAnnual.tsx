import MainSection from '@components/theme/sections/MainSection';
import useHandleEvolutionPagination
  from '@hooks/use-handle-evolution-pagination/useHandleEvolutionPagination';
import { isNotNullish } from '@utils/types/TypesUtils';
import dayjs from 'dayjs';
import React from 'react';
import EvolutionAnnualTable from './components/EvolutionAnnualTable';
import EvolutionPagination from './components/EvolutionPagination';

/**
 * A component that displays an annual evolution table for financial accounts,
 * showing monthly values and gain/loss metrics grouped by account type.
 * Fetches evolution data from the API based on the selected year and responds
 * to screen size by showing an appropriate number of months.
 */
export default function EvolutionAnnual() {
  // Use the custom hook to handle pagination and data fetching
  const {
    annualTotal,
    monthDates,
    monthsToDisplay,
    currentMonthDate,
    goToPreviousPeriod,
    goToNextPeriod,
    isFirstPeriod,
    isLastPeriod,
    isLoading,
  } = useHandleEvolutionPagination(dayjs().year());

  return (
    <MainSection>
      {/* Pagination controls */}
      <EvolutionPagination
        currentDate={currentMonthDate}
        monthsToDisplay={monthsToDisplay}
        onPreviousPeriod={goToPreviousPeriod}
        onNextPeriod={goToNextPeriod}
        isFirstPeriod={isFirstPeriod}
        isLastPeriod={isLastPeriod}
      />

      <div className="w-full rounded-md border text-sm grid overflow-auto">
        {
          !isLoading && isNotNullish(annualTotal)
            ? (
              <EvolutionAnnualTable
                year={currentMonthDate.year()}
                monthDates={monthDates}
                annualTotal={annualTotal}
                monthsToDisplay={monthsToDisplay}
              />
            ) : (
              <div className="p-4 text-center">loading</div>
            )
        }
      </div>
    </MainSection>
  );
}
