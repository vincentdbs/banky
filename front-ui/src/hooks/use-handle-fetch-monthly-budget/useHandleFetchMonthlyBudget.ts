import { useState, useEffect } from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import dayjs from 'dayjs';
import EvolutionService from '@services/evolution/EvolutionService';
import { MonthlyBudgetResponse } from '@api/evolution/EvolutionTypes';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import useLoader, { LoaderState } from '@lib/plume-http-react-hook-loader/promiseLoaderHook';

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
  const fetchMonthlyBudget = (): void => {
    loader.monitor(
      evolutionService.fetchMonthlyBudget(currentYear, currentMonth)
        .then((response: MonthlyBudgetResponse) => {
          setMonthlyBudget(response);
        })
    );
  };
  
  /**
   * Updates the current year and fetches new budget data
   * 
   * @param year The new year to set
   */
  const handleUpdateYear = (year: number): void => {
    setCurrentYear(year);
  };
  
  /**
   * Updates the current month and fetches new budget data
   * 
   * @param month The new month to set (0-11)
   */
  const handleUpdateMonth = (month: number): void => {
    setCurrentMonth(month);
  };
  
  // Fetch monthly budget data when component is mounted
  useOnComponentMounted(() => {
    fetchMonthlyBudget();
  });
  
  // Fetch monthly budget data when year or month changes
  useEffect(() => {
    fetchMonthlyBudget();
  }, [currentYear, currentMonth]);
  
  return {
    currentYear,
    currentMonth,
    monthlyBudget,
    handleUpdateYear,
    handleUpdateMonth,
    isLoading: loader.isLoading,
  };
}