/**
 * Component for displaying a single account row in the annual evolution table
 */
import { AccountType } from '@api/accounts/AccountsTypes';
import { AnnualTotal, TotalByAccount } from '@api/evolution/TreasuryEvolutionTypes';
import React from 'react';
import BaseCell from '@components/theme/table/cells/base/BaseCell';
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
  }: AccountRowProps,
) {
  return (
    <>
      {/* Account short name and full name */}
      <BaseCell>{account.shortName}</BaseCell>
      <BaseCell>{account.name}</BaseCell>

      {/* Monthly data for this account */}
      {monthDates.map((monthDate: string) => (
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
