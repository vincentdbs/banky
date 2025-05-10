/**
 * Component for displaying a single account row in the annual evolution table
 */
import { AccountType } from '@api/accounts/AccountsTypes';
import { AnnualTotal, TotalByAccount } from '@api/evolution/TreasuryEvolutionTypes';
import React from 'react';
import MonthlyAccountBlock from '../components/MonthlyAccountBlock';

type AccountRowProps = {
  account: TotalByAccount,
  accountType: AccountType,
  monthDates: string[],
  annualTotal: AnnualTotal,
};

/**
 * Displays a row for a single account with its name and monthly data
 */
export default function AccountRow(
  {
    account,
    accountType,
    monthDates,
    annualTotal,
  }: AccountRowProps
) {
  return (
    <>
      {/* Account short name and full name */}
      <div className="p-3 border-b border-r">{account.shortName}</div>
      <div className="p-3 border-b border-r">{account.name}</div>

      {/* Monthly data for this account */}
      {monthDates.map((monthDate) => (
        <MonthlyAccountBlock
          key={`${account.id}-${monthDate}`}
          accountId={account.id}
          monthDate={monthDate}
          accountType={accountType}
          annualTotal={annualTotal}
        />
      ))}
    </>
  );
}