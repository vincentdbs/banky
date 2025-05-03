import { AccountType } from '@api/accounts/AccountsTypes';
import {
  AnnualTotal, TotalByAccount,
  TotalByAccountAndMonth,
  TotalByCategory,
} from '@api/evolution/TreasuryEvolutionTypes';
import useMessages from '@i18n/hooks/messagesHook';
import { formatCurrency, formatPercentage } from '@utils/number/NumberUtils';
import React from 'react';

type CategorySubtotalRowProps = {
  category: AccountType,
  monthDates: string[],
  annualTotal: AnnualTotal,
};

/**
 * Displays the subtotal row for a specific account category
 */
export default function CategorySubtotalRow(
  {
    category,
    monthDates,
    annualTotal,
  }: CategorySubtotalRowProps
) {
  const { messages } = useMessages();

  return (
    <>
      {/* Subtotal row for this category */}
      <div className="col-span-2 p-3 font-medium bg-slate-100 border-b border-r">
        {messages.evolution.annual.subTotal}
      </div>

      {/* Monthly subtotals for this category */}
      {monthDates.map((monthDate) => {
        const totalByAccountAndMonth: TotalByAccountAndMonth = annualTotal[monthDate];
        const totalByCategory: TotalByCategory = totalByAccountAndMonth.totalByCategory[category];

        // Default values if no data exists for this month
        const total: number = totalByCategory?.total ?? 0;
        const gainLoss: number = totalByCategory?.gainLoss ?? 0;
        const gainLossPercentage: number = totalByCategory?.gainLossPercentage ?? 0;

        return (
          <React.Fragment key={`${category}-subtotal-${monthDate}`}>
            <div
              className={`p-3 text-right font-medium bg-slate-100 border-b border-r ${total < 0 ? 'text-red-600' : ''}`}>
              {formatCurrency(total)}
            </div>
            <div
              className={`p-3 text-right font-medium bg-slate-100 border-b border-r ${gainLoss < 0 ? 'text-red-600' : gainLoss > 0 ? 'text-green-600' : ''}`}>
              {formatCurrency(gainLoss)}
            </div>
            <div
              className={`p-3 text-right font-medium bg-slate-100 border-b border-r ${gainLossPercentage < 0 ? 'text-red-600' : gainLossPercentage > 0 ? 'text-green-600' : ''}`}>
              {formatPercentage(gainLossPercentage)}
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}