import { MonthlyBudgetResponse } from '@api/evolution/EvolutionTypes';
import {
  MonthlyBudgetType,
} from '@components/pages/evolution/monthly-budget/controls/MonthlyBudgetControls';
import useLoader, { LoaderState } from '@lib/plume-http-react-hook-loader/promiseLoaderHook';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import EvolutionService from '@services/evolution/EvolutionService';
import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import { useState } from 'react';

type UseHandleFetchMonthlyBudget = {
  currentYear: number;
  currentMonth: number;
  monthlyBudget: MonthlyBudgetResponse | null;
  monthlyBudgetType: MonthlyBudgetType;
  updateMonthlyBudgetType: (type: MonthlyBudgetType) => void;
  handleUpdateYear: (year: number) => void;
  handleUpdateMonth: (month: number) => void;
  isLoading: boolean;
}

/**
 * Hook for handling monthly budget data fetching and state management
 * Manages current selected year and month, and fetches monthly budget data when they change
 *
 * @returns An object containing the current year, month, monthly budget data, and methods to update them
 */
export default function useHandleFetchMonthlyBudget(): UseHandleFetchMonthlyBudget {
  // Services
  const evolutionService: EvolutionService = getGlobalInstance(EvolutionService);

  // State
  const [currentYear, setCurrentYear] = useState<number>(dayjs().year());
  const [currentMonth, setCurrentMonth] = useState<number>(dayjs().month());
  const [monthlyBudget, setMonthlyBudget] = useState<MonthlyBudgetResponse | null>(null);
  const [monthlyBudgetType, setMonthlyBudgetType] = useState<MonthlyBudgetType>(MonthlyBudgetType.REAL);

  // Loader
  const loader: LoaderState = useLoader();

  /**
   * Fetches monthly budget data for the current year and month
   */
  const fetchMonthlyBudget = (year: number, month: number, type: MonthlyBudgetType): void => {
    loader.monitor(
      evolutionService.fetchMonthlyBudget(year, month, type)
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
    fetchMonthlyBudget(newYear, currentMonth, monthlyBudgetType);
  };

  /**
   * Updates the current month and fetches new budget data
   *
   * @param newMonth The new month to set (0-11)
   */
  const handleUpdateMonth = (newMonth: number): void => {
    setCurrentMonth(newMonth);
    fetchMonthlyBudget(currentYear, newMonth, monthlyBudgetType);
  };

  /**
   * Sets the type of monthly budget to display (real or theoretical)
   *
   * @param type The type of monthly budget to set
   */
  const updateMonthlyBudgetType = (type: MonthlyBudgetType): void => {
    fetchMonthlyBudget(currentYear, currentMonth, type);
    setMonthlyBudgetType(type);
  };

  useOnComponentMounted(() => {
    fetchMonthlyBudget(currentYear, currentMonth, monthlyBudgetType);
  });

  return {
    currentYear,
    currentMonth,
    monthlyBudget,
    monthlyBudgetType,
    updateMonthlyBudgetType,
    handleUpdateYear,
    handleUpdateMonth,
    isLoading: loader.isLoading,
  };
}