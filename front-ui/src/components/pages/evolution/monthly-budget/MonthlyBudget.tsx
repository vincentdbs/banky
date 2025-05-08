import MainSection from '@components/theme/sections/MainSection';
import useMessages from '@i18n/hooks/messagesHook';
import React from 'react';
import MonthlyBudgetTable from './table/MonthlyBudgetTable';

/**
 * Monthly Budget page component that displays budget data by category
 * Shows the monthly spending, budgeted amounts, and percentages
 */
export default function MonthlyBudget() {
  const { messages } = useMessages();

  return (
    <MainSection>
      <MonthlyBudgetTable />
    </MainSection>
  );
}