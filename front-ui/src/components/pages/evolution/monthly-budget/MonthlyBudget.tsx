import MainSection from '@components/theme/sections/MainSection';
import React from 'react';
import MonthlyBudgetTable from './table/MonthlyBudgetTable';

/**
 * Monthly Budget page component that displays budget data by category
 * Shows the monthly spending, budgeted amounts, and percentages
 */
export default function MonthlyBudget() {
  return (
    <MainSection>
      <MonthlyBudgetTable />
    </MainSection>
  );
}
