/**
 * Component for displaying monthly data for an account in the annual evolution table
 */
import { AccountType } from '@api/accounts/AccountsTypes';
import {
  AnnualTotal,
  TotalByAccount,
  TotalByAccountAndMonth,
} from '@api/evolution/TreasuryEvolutionTypes';
import AmountCell from '@components/theme/table/cells/number/AmountCell';
import React from 'react';

type MonthlyAccountBlockProps = {
  accountId: string,
  monthDate: string,
  accountType: AccountType,
  annualTotal: AnnualTotal,
};

/**
 * Displays the monthly data (amount, gain/loss, percentage) for a specific account
 */
export default function MonthlyAccountBlock(
  {
    accountId,
    monthDate,
    accountType,
    annualTotal,
  }: MonthlyAccountBlockProps,
) {
  const totalByAccountAndMonth: TotalByAccountAndMonth = annualTotal[monthDate];
  let accountData: TotalByAccount | undefined;

  if (totalByAccountAndMonth && totalByAccountAndMonth.totalByCategory[accountType]) {
    accountData = totalByAccountAndMonth.totalByCategory[accountType].totalByAccount.find(
      (totalByAccount: TotalByAccount) => totalByAccount.id === accountId,
    );
  }

  // Default values if no data exists for this month
  const total: string = accountData?.total ?? '0';
  const gainLoss: string = accountData?.gainLoss ?? '0';
  const gainLossPercentage: string = accountData?.gainLossPercentage ?? '0';

  return (
    <>
      <AmountCell amount={total} />
      <AmountCell amount={gainLoss} />
      <AmountCell type="percentage" amount={gainLossPercentage} />
    </>
  );
}
