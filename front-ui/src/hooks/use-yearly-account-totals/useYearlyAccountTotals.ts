import { YearlyAccountTotalsResponse } from '@api/evolution/YearlyAccountTotalsTypes';
import useLoader, { LoaderState } from '@lib/plume-http-react-hook-loader/promiseLoaderHook';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import EvolutionService from '@services/evolution/EvolutionService';
import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import { useState } from 'react';

/**
 * Custom hook for handling yearly account totals data fetching and state
 *
 * @returns Object containing the yearly account totals data and loading state
 */
export default function useYearlyAccountTotals() {
  const evolutionService: EvolutionService = getGlobalInstance(EvolutionService);

  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [yearlyTotals, setYearlyTotals] = useState<YearlyAccountTotalsResponse | null>(null);

  const loader: LoaderState = useLoader();

  const fetchYearlyTotals = (year: number) => {
    loader.monitor(
      evolutionService.fetchYearlyAccountTotals(year)
        .then(setYearlyTotals),
    );
  };

  useOnComponentMounted(() => {
    fetchYearlyTotals(selectedYear);
  });

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    fetchYearlyTotals(year);
  };

  return {
    yearlyTotals,
    selectedYear,
    handleYearChange,
    isLoading: loader.isLoading,
  };
}
