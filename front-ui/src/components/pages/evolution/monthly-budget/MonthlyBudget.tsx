import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import useLoader from '@lib/plume-http-react-hook-loader/promiseLoaderHook';
import useMessages from '@i18n/hooks/messagesHook';
import EvolutionService from '@services/evolution/EvolutionService';
import { MonthlyBudgetResponse } from '@api/evolution/EvolutionTypes';
import RessourceLayout from '@components/layout/parameters/RessourceLayout';
import { useObservable } from 'micro-observables';
import MonthlyBudgetTable from './table/MonthlyBudgetTable';

/**
 * Monthly Budget page component that displays budget data by category
 * Shows the monthly spending, budgeted amounts, and percentages
 */
export default function MonthlyBudget() {
  // Services
  const evolutionService: EvolutionService = getGlobalInstance(EvolutionService);
  
  // Hooks
  const { messages } = useMessages();
  const loader = useLoader();
  
  // State
  const [monthlyBudget, setMonthlyBudget] = React.useState<MonthlyBudgetResponse | null>(null);
  
  const fetchBudgetData = () => {
    loader.monitor(
      evolutionService.fetchMonthlyBudget()
        .then((response) => {
          setMonthlyBudget(response);
        })
    );
  };
  
  useOnComponentMounted(() => {
    fetchBudgetData();
  });
  
  return (
    <RessourceLayout
      title={messages.evolution.monthlyBudget.title}
      subTitle={messages.evolution.monthlyBudget.subTitle}
    >
      {loader.isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {!loader.isLoading && monthlyBudget && (
        <MonthlyBudgetTable monthlyBudget={monthlyBudget} />
      )}
    </RessourceLayout>
  );
}