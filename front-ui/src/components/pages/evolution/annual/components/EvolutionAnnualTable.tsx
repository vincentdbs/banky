/**
 * Component that orchestrates all the annual evolution table components
 */
import { AccountType } from '@api/accounts/AccountsTypes';
import { AnnualTotal } from '@api/evolution/TreasuryEvolutionTypes';
import React from 'react';
import dayjs from 'dayjs';
import EvolutionAnnualCategorySection from './EvolutionAnnualCategorySection';
import EvolutionAnnualColumnsHeaderRow from '../header/EvolutionAnnualColumnsHeaderRow';
import EvolutionAnnualGrandTotalRow from '../rows/EvolutionAnnualGrandTotalRow';
import EvolutionAnnualHeader from '../header/EvolutionAnnualHeader';

type EvolutionAnnualTableProps = {
  year: number,
  monthDates: string[],
  annualTotal: AnnualTotal,
  monthsToDisplay: number,
};

/**
 * Combines all table components into a complete annual evolution table
 * with responsive grid based on the number of months to display
 */
export default function EvolutionAnnualTable(
  {
    year,
    monthDates,
    annualTotal,
    monthsToDisplay,
  }: EvolutionAnnualTableProps,
) {
  // Calculate grid columns based on number of months to display
  // Each month has 3 columns (value, gain/loss, percentage)
  const gridColumnsTemplate = `80px 150px repeat(${3 * monthsToDisplay},minmax(110px,1fr))`;

  return (
    <div className="grid" style={{ gridTemplateColumns: gridColumnsTemplate }}>
      {/* Header row with year and months */}
      <EvolutionAnnualHeader year={year} monthDates={monthDates} />
      {/* Column titles row */}
      <EvolutionAnnualColumnsHeaderRow monthDates={monthDates} />
      {/* Account categories with their accounts and subtotals */}
      {Object.values(AccountType).map((category: AccountType) => (
        <EvolutionAnnualCategorySection
          key={category}
          category={category}
          monthDates={monthDates}
          annualTotal={annualTotal}
        />
      ))}
      {/* Grand total row */}
      <EvolutionAnnualGrandTotalRow
        monthDates={monthDates}
        annualTotal={annualTotal}
      />
    </div>
  );
}
