import { AccountType } from '@api/accounts/AccountsTypes';
import {
  AnnualTotal,
  TotalByAccountAndMonth,
  TotalByCategory,
} from '@api/evolution/TreasuryEvolutionTypes';
import SecondaryHeaderAmountCell
  from '@components/theme/table/cells/header/SecondaryHeaderAmountCell';
import SecondaryHeaderCell from '@components/theme/table/cells/header/SecondaryHeaderCell';
import useMessages from '@i18n/hooks/messagesHook';
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
      <SecondaryHeaderCell className="col-span-2">
        {messages.evolution.annual.subTotal}
      </SecondaryHeaderCell>

      {/* Monthly subtotals for this category */}
      {monthDates.map((monthDate: string) => {
        const totalByAccountAndMonth: TotalByAccountAndMonth = annualTotal?.[monthDate];
        const totalByCategory: TotalByCategory = totalByAccountAndMonth?.totalByCategory?.[category];

        // Default values if no data exists for this month
        const total: string = totalByCategory?.total ?? '0';
        const gainLoss: string = totalByCategory?.gainLoss ?? '0';
        const gainLossPercentage: string = totalByCategory?.gainLossPercentage ?? '0';

        return (
          <React.Fragment key={`${category}-subtotal-${monthDate}`}>
            <SecondaryHeaderAmountCell align='right' amount={total} />
            <SecondaryHeaderAmountCell align='right' amount={gainLoss} />
            <SecondaryHeaderAmountCell align='right' type="percentage" amount={gainLossPercentage} />
          </React.Fragment>
        );
      })}
    </>
  );
}
