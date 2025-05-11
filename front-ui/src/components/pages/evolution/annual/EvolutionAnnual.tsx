import { AnnualTotal, YearSummary } from '@api/evolution/TreasuryEvolutionTypes';
import MainSection from '@components/theme/sections/MainSection';
import useLoader, { LoaderState } from '@lib/plume-http-react-hook-loader/promiseLoaderHook';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import EvolutionService from '@services/evolution/EvolutionService';
import { isNotNullish } from '@utils/types/TypesUtils';
import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import EvolutionAnnualTable from './components/EvolutionAnnualTable';

type EvolutionAnnualProps = {
  year?: number,
};

/**
 * A component that displays an annual evolution table for financial accounts,
 * showing monthly values and gain/loss metrics grouped by account type.
 * Fetches evolution data from the API based on the selected year.
 */
export default function EvolutionAnnual(
  {
    year = dayjs().year(),
  }: EvolutionAnnualProps,
) {
  // Service retrieval
  const evolutionService: EvolutionService = getGlobalInstance(EvolutionService);

  // State declaration
  const [annualTotal, setAnnualTotal] = useState<AnnualTotal | undefined>(undefined);
  const [yearSummary, setYearSummary] = useState<YearSummary>({
    total: 0,
    gainLoss: 0,
    interest: 0,
  });

  // Loader for API requests
  const treasuryLoader: LoaderState = useLoader();

  const createMonthDates = (year: number): string[] => {
    return Array.from({ length: 12 }, (_, i: number) => {
      return dayjs(new Date(year, i, 1)).format('YYYY-MM-DD');
    });
  };

  // Fetch treasury evolution data when component mounts or when year changes
  useOnComponentMounted(() => {
    fetchTreasuryData(year);
  });

  // Fetch treasury data from API
  const fetchTreasuryData = (selectedYear: number): void => {
    treasuryLoader.monitor(
      evolutionService
        .fetchTreasuryEvolution(selectedYear, 12)
        .then((data: AnnualTotal) => {
          setAnnualTotal(data);
        }),
    );
  };

  // Create an array of month dates for the year in chronological order
  const monthDates: string[] = createMonthDates(year);

  return (
    <MainSection>
      <div className="w-full min-w-[1200px] rounded-md border text-sm grid overflow-auto">
        {
          !treasuryLoader.isLoading && isNotNullish(annualTotal)
            ? (
              <EvolutionAnnualTable
                year={year}
                monthDates={monthDates}
                annualTotal={annualTotal}
              />
            ) : (
              <div className="p-4 text-center">Loading treasury data...</div>
            )
        }
      </div>
    </MainSection>
  );
}