/**
 * Component for displaying monthly data for an account in the annual evolution table
 */
import { AccountType } from '@api/accounts/AccountsTypes';
import {
  AnnualTotal,
  TotalByAccount,
  TotalByAccountAndMonth,
} from '@api/evolution/TreasuryEvolutionTypes';
import {
  formatEuroDecimalPriceFromString,
  formatPercentageDecimalPriceFromString,
} from '@utils/number/NumberUtils';
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
      (acc) => acc.id === accountId,
    );
  }

  // Default values if no data exists for this month
  const total: string = accountData?.total ?? '0';
  const gainLoss: string = accountData?.gainLoss ?? '0';
  const gainLossPercentage: string = accountData?.gainLossPercentage ?? '0';

  return (
    <>
      <div className={`p-3 text-right border-b border-r ${parseInt(total) < 0 ? 'text-red-600' : ''}`}>
        {formatEuroDecimalPriceFromString(total)}
      </div>
      <div
        className={`p-3 text-right border-b border-r ${parseInt(gainLoss) < 0 ? 'text-red-600' : parseInt(gainLoss) > 0 ? 'text-green-600' : ''}`}>
        {formatEuroDecimalPriceFromString(gainLoss)}
      </div>
      <div
        className={`p-3 text-right border-b border-r ${parseInt(gainLossPercentage) < 0 ? 'text-red-600' : parseInt(gainLossPercentage) > 0 ? 'text-green-600' : ''}`}>
        {formatPercentageDecimalPriceFromString(gainLossPercentage)}
      </div>
    </>
  );
}
