import { getMockAnnualEvolutionData } from '@components/pages/evolution/annual/annual-mock-data';
import MonthlyBudget from '@components/pages/evolution/monthly-budget/MonthlyBudget';
import {
  EVOLUTION_MONTHLY_BUDGET,
  EVOLUTION_ANNUAL,
  WILD_CARD,
} from '@components/Routes';
import EvolutionAnnual from '@components/pages/evolution/annual/EvolutionAnnual';
import React from 'react';
import { Navigate, useRoutes } from 'react-router';

/**
 * Router component for the Evolution section
 * Handles routing to Treasury, Graph, and Monthly Budget pages
 */
export default function EvolutionRouter() {
  const mockData = getMockAnnualEvolutionData();

  return useRoutes(
    [
      {
        path: EVOLUTION_ANNUAL,
        element: <EvolutionAnnual
          year={mockData.year}
          annualTotal={mockData.annualTotal}
          yearSummary={mockData.yearSummary}
        />,
      },
      {
        path: EVOLUTION_MONTHLY_BUDGET,
        element: <MonthlyBudget />,
      },
      {
        path: WILD_CARD,
        element: <Navigate to="/" />,
      },
    ],
  );
}
