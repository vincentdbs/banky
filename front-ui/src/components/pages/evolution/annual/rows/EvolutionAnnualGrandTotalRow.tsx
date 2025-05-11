import { AnnualTotal, TotalByAccountAndMonth } from '@api/evolution/TreasuryEvolutionTypes';
import TernaryHeaderAmountCell from '@components/theme/table/cells/header/TernaryHeaderAmountCell';
import TernaryHeaderCell from '@components/theme/table/cells/header/TernaryHeaderCell';
import useMessages from '@i18n/hooks/messagesHook';
import React from 'react';

type GrandTotalProps = {
  monthDates: string[],
  annualTotal: AnnualTotal,
};

/**
 * Displays the grand total row summing all accounts across categories
 */
export default function EvolutionAnnualGrandTotalRow(
  {
    monthDates,
    annualTotal,
  }: GrandTotalProps,
) {
  const { messages } = useMessages();

  return (
    <>
      {/* Grand total row */}
      <TernaryHeaderCell className="col-span-2">
        {messages.evolution.annual.total}
      </TernaryHeaderCell>

      {/* Monthly grand totals */}
      {
        monthDates.map((monthDate: string) => {
          const monthData: TotalByAccountAndMonth = annualTotal[monthDate];

          // Default values if no data exists for this month
          const total: string = monthData?.total ?? '0';
          const gainLoss: string = monthData?.gainLoss ?? '0';
          const gainLossPercentage: string = monthData?.gainLossPercentage ?? '0';

          return (
            <React.Fragment key={`grand-total-${monthDate}`}>
              <TernaryHeaderAmountCell align="right" amount={total} />
              <TernaryHeaderAmountCell align="right" amount={gainLoss} />
              <TernaryHeaderAmountCell
                align="right" type="percentage"
                amount={gainLossPercentage}
              />
            </React.Fragment>
          );
        })
      }
    </>
  );
}
