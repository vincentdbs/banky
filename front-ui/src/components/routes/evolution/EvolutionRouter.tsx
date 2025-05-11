import EvolutionAnnual from '@components/pages/evolution/annual/EvolutionAnnual';
import MonthlyBudget from '@components/pages/evolution/monthly-budget/MonthlyBudget';
import YearlyAccountTotals from '@components/pages/evolution/yearly-totals/YearlyAccountTotals';
import { EVOLUTION_ANNUAL, EVOLUTION_MONTHLY_BUDGET, EVOLUTION_YEARLY_TOTALS, WILD_CARD } from '@components/Routes';
import React from 'react';
import { Navigate, useRoutes } from 'react-router';

/**
 * Router component for the Evolution section
 * Handles routing to Treasury, Graph, and Monthly Budget pages
 */
export default function EvolutionRouter() {
  return useRoutes(
    [
      {
        path: EVOLUTION_ANNUAL,
        element: <EvolutionAnnual />,
      },
      {
        path: EVOLUTION_MONTHLY_BUDGET,
        element: <MonthlyBudget />,
      },
      {
        path: EVOLUTION_YEARLY_TOTALS,
        element: <YearlyAccountTotals />,
      },
      {
        path: WILD_CARD,
        element: <Navigate to="/" />,
      },
    ],
  );
}
