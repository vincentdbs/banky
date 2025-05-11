/**
 * Component for displaying a category section with accounts and subtotal
 */
import { AccountType } from '@api/accounts/AccountsTypes';
import { AnnualTotal, TotalByAccount } from '@api/evolution/TreasuryEvolutionTypes';
import React from 'react';
import AccountRow from '../rows/AccountRow';
import CategorySubtotalRow from '../rows/CategorySubtotalRow';

type EvolutionAnnualCategorySectionProps = {
  category: AccountType,
  monthDates: string[],
  annualTotal: AnnualTotal,
};

/**
 * Displays a section for a specific category including all its accounts and a subtotal
 */
export default function EvolutionAnnualCategorySection(
  {
    category,
    monthDates,
    annualTotal,
  }: EvolutionAnnualCategorySectionProps,
) {
  // Get accounts for this category from all months
  const accountsMap = new Map<string, TotalByAccount>();

  // Collect unique accounts across all months for this category
  monthDates.forEach((monthDate) => {
    const monthData = annualTotal[monthDate];
    if (monthData && monthData.totalByCategory[category]) {
      monthData.totalByCategory[category].totalByAccount.forEach((account) => {
        if (!accountsMap.has(account.id)) {
          accountsMap.set(account.id, account);
        }
      });
    }
  });

  const accounts = Array.from(accountsMap.values());

  return (
    <>
      {/* Render accounts of this category */}
      {accounts.map((account: TotalByAccount) => (
        <AccountRow
          key={account.id}
          account={account}
          accountType={category}
          monthDates={monthDates}
          annualTotal={annualTotal}
        />
      ))}

      {/* Subtotal for this category */}
      <CategorySubtotalRow
        category={category}
        monthDates={monthDates}
        annualTotal={annualTotal}
      />
    </>
  );
}
