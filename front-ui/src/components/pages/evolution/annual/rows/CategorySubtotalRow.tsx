import { AccountType } from '@api/accounts/AccountsTypes';
import {
  AnnualTotal, TotalByAccount,
  TotalByAccountAndMonth,
  TotalByCategory,
} from '@api/evolution/TreasuryEvolutionTypes';
import useMessages from '@i18n/hooks/messagesHook';
import {
  formatCurrency,
  formatEuroDecimalPriceFromString,
  formatPercentage,
} from '@utils/number/NumberUtils';
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
  }: CategorySubtotalRowProps,
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
        const totalByAccountAndMonth: TotalByAccountAndMonth = annualTotal?.[monthDate];
        const totalByCategory: TotalByCategory = totalByAccountAndMonth?.totalByCategory?.[category];

        // Default values if no data exists for this month
        const total: string = totalByCategory?.total ?? '0';
        const gainLoss: string = totalByCategory?.gainLoss ?? '0';
        const gainLossPercentage: string = totalByCategory?.gainLossPercentage ?? '0';

        return (
          <React.Fragment key={`${category}-subtotal-${monthDate}`}>
            <div
              className={`p-3 text-right font-medium bg-slate-100 border-b border-r ${parseInt(total) < 0 ? 'text-red-600' : ''}`}>
              {formatEuroDecimalPriceFromString(total)}
            </div>
            <div
              className={`p-3 text-right font-medium bg-slate-100 border-b border-r ${parseInt(gainLoss) < 0 ? 'text-red-600' : parseInt(gainLoss) > 0 ? 'text-green-600' : ''}`}
            >
              {formatEuroDecimalPriceFromString(gainLoss)}
            </div>
            <div
              className={`p-3 text-right font-medium bg-slate-100 border-b border-r ${parseInt(gainLossPercentage) < 0 ? 'text-red-600' : parseInt(gainLossPercentage) > 0 ? 'text-green-600' : ''}`}>
              {formatEuroDecimalPriceFromString(gainLossPercentage)}
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}
