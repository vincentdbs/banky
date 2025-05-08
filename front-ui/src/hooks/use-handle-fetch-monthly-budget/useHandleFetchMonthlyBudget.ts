import { MonthlyBudgetResponse } from '@api/evolution/EvolutionTypes';
import useLoader, { LoaderState } from '@lib/plume-http-react-hook-loader/promiseLoaderHook';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import EvolutionService from '@services/evolution/EvolutionService';
import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import { useEffect, useState } from 'react';

/**
 * Hook for handling monthly budget data fetching and state management
 * Manages current selected year and month, and fetches monthly budget data when they change
 *
 * @returns An object containing the current year, month, monthly budget data, and methods to update them
 */
export default function useHandleFetchMonthlyBudget() {
  // Services
  const evolutionService: EvolutionService = getGlobalInstance(EvolutionService);

  // State
  const [currentYear, setCurrentYear] = useState<number>(dayjs().year());
  const [currentMonth, setCurrentMonth] = useState<number>(dayjs().month());
  const [monthlyBudget, setMonthlyBudget] = useState<MonthlyBudgetResponse | null>(null);

  // Loader
  const loader: LoaderState = useLoader();

  /**
   * Fetches monthly budget data for the current year and month
   */
  const fetchMonthlyBudget = (year: number, month: number): void => {
    loader.monitor(
      evolutionService.fetchMonthlyBudget(year, month)
        .then((response: MonthlyBudgetResponse) => {
          setMonthlyBudget(response);
        }),
    );
  };

  /**
   * Updates the current year and fetches new budget data
   *
   * @param newYear The new year to set
   */
  const handleUpdateYear = (newYear: number): void => {
    setCurrentYear(newYear);
    fetchMonthlyBudget(newYear, currentMonth);
  };

  /**
   * Updates the current month and fetches new budget data
   *
   * @param newMonth The new month to set (0-11)
   */
  const handleUpdateMonth = (newMonth: number): void => {
    setCurrentMonth(newMonth);
    fetchMonthlyBudget(currentYear, newMonth);
  };

  useOnComponentMounted(() => {
    fetchMonthlyBudget(currentYear, currentMonth);
  });

  return {
    currentYear,
    currentMonth,
    monthlyBudget,
    handleUpdateYear,
    handleUpdateMonth,
    isLoading: loader.isLoading,
  };
}