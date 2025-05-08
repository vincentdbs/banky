import RessourceLayout from '@components/layout/parameters/RessourceLayout';
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
    <RessourceLayout
      title={messages.evolution.monthlyBudget.title}
      subTitle={messages.evolution.monthlyBudget.subTitle}
    >
      <MonthlyBudgetTable />
    </RessourceLayout>
  );
}