/**
 * Component that orchestrates all the annual evolution table components
 */
import { AccountType } from '@api/accounts/AccountsTypes';
import { AnnualTotal } from '@api/evolution/TreasuryEvolutionTypes';
import React from 'react';
import EvolutionAnnualCategorySection from './EvolutionAnnualCategorySection';
import EvolutionAnnualColumnsHeaderRow from '../header/EvolutionAnnualColumnsHeaderRow';
import EvolutionAnnualGrandTotalRow from '../rows/EvolutionAnnualGrandTotalRow';
import EvolutionAnnualHeader from '../header/EvolutionAnnualHeader';

type EvolutionAnnualTableProps = {
  year: number,
  monthDates: string[],
  annualTotal: AnnualTotal,
};

/**
 * Combines all table components into a complete annual evolution table
 */
export default function EvolutionAnnualTable(
  {
    year,
    monthDates,
    annualTotal,
  }: EvolutionAnnualTableProps,
) {
  return (
    <div className="grid grid-cols-[80px_150px_repeat(36,minmax(120px,1fr))]">
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