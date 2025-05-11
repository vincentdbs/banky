import { AnnualTotal } from '@api/evolution/TreasuryEvolutionTypes';
import useLoader, { LoaderState } from '@lib/plume-http-react-hook-loader/promiseLoaderHook';
import { useOnDependenciesChange } from '@lib/react-hooks-alias/ReactHooksAlias';
import EvolutionService from '@services/evolution/EvolutionService';
import { computeFirstDayOfTheYear } from '@utils/dates/DatesUtils';
import { FIRST_YEAR } from '@utils/number/NumberUtils';
import dayjs, { Dayjs } from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import { useEffect, useState } from 'react';

/**
 * Hook for handling evolution pagination and responsive display
 * of monthly data based on screen width
 */
export default function useHandleEvolutionPagination(initialYear: number) {
  // Service retrieval
  const evolutionService: EvolutionService = getGlobalInstance(EvolutionService);

  const loader: LoaderState = useLoader();

  // State declaration
  const [annualTotal, setAnnualTotal] = useState<AnnualTotal | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(computeFirstDayOfTheYear(initialYear));
  const [monthsToDisplay, setMonthsToDisplay] = useState<number>(4);
  const [monthDates, setMonthsDates] = useState<string[]>([]);

  const computeNumberOfMonthsToDisplay = (width: number): number => {
    if (width < 1200) {
      return 1;
    } else if (width < 1600) {
      return 2;
    } else if (width < 2000) {
      return 3;
    } else {
      return 4;
    }
  };

  // Handle responsive layout
  useEffect(() => {
    const handleResize = (): void => {
      setMonthsToDisplay(computeNumberOfMonthsToDisplay(window.innerWidth));
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch data on mount and when dependencies change
  useOnDependenciesChange(() => {
    fetchTreasuryData(currentMonth, monthsToDisplay);
    updateMonthDates(currentMonth, monthsToDisplay);
  }, [monthsToDisplay]);

  // Create an array of month dates for the display period
  const updateMonthDates = (firstMonth: Dayjs, numberOfMonths: number): void => {
    const newMonths: string[] = Array.from({ length: numberOfMonths }, (_, i: number) => {
      return dayjs(firstMonth)
        .add(i, 'month')
        .format('YYYY-MM-DD');
    });
    setMonthsDates(newMonths);
  };

  // Fetch treasury data from API
  const fetchTreasuryData = (startDate: Dayjs, numberOfMonths: number): void => {
    loader.monitor(
      evolutionService
        .fetchTreasuryEvolution(startDate, numberOfMonths)
        .then((data: AnnualTotal) => {
          setAnnualTotal(data);
        }),
    );
  };

  // Go to previous period
  const goToPreviousPeriod = (): void => {
    const nextFirstMonth: Dayjs = currentMonth.subtract(monthsToDisplay, 'month');
    setCurrentMonth(nextFirstMonth);
    fetchTreasuryData(nextFirstMonth, monthsToDisplay);
    updateMonthDates(nextFirstMonth, monthsToDisplay);
  };

  // Go to next period
  const goToNextPeriod = (): void => {
    const nextFirstMonth: Dayjs = currentMonth.add(monthsToDisplay, 'month');
    setCurrentMonth(nextFirstMonth);
    fetchTreasuryData(nextFirstMonth, monthsToDisplay);
    updateMonthDates(nextFirstMonth, monthsToDisplay);
  };

  // Calculate if it's the first period (can't go back further)
  const isFirstPeriod = (): boolean => {
    // This is an example logic, adjust as needed
    return currentMonth.year() < FIRST_YEAR;
  };

  // Calculate if it's the last period (can't go forward further)
  const isLastPeriod = (): boolean => {
    // Can't navigate to future months
    return currentMonth.year() >= dayjs().year()
      && currentMonth.month() >= dayjs().month();
  };

  return {
    annualTotal,
    monthDates,
    monthsToDisplay,
    currentMonthDate: currentMonth,
    goToPreviousPeriod,
    goToNextPeriod,
    isFirstPeriod: isFirstPeriod(),
    isLastPeriod: isLastPeriod(),
    isLoading: loader.isLoading,
  };
}
