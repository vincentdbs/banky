import { AnnualTotal } from '@api/evolution/TreasuryEvolutionTypes';
import useMessages from '@i18n/hooks/messagesHook';
import {
  formatEuroDecimalPriceFromString,
  formatPercentageDecimalPriceFromString,
} from '@utils/number/NumberUtils';
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
      <div className="col-span-2 p-3 font-bold bg-slate-200 border-b border-r">
        {messages.evolution.annual.total}
      </div>

      {/* Monthly grand totals */}
      {
        monthDates.map((monthDate: string) => {
            const monthData = annualTotal[monthDate];

            // Default values if no data exists for this month
            const total = monthData?.total ?? '0';
            const gainLoss = monthData?.gainLoss ?? '0';
            const gainLossPercentage = monthData?.gainLossPercentage ?? '0';

            return (
              <React.Fragment key={`grand-total-${monthDate}`}>
                <div
                  className={`p-3 text-right font-bold bg-slate-200 border-b border-r ${parseInt(total) < 0 ? 'text-red-600' : ''}`}>
                  {formatEuroDecimalPriceFromString(total)}
                </div>
                <div
                  className={`p-3 text-right font-bold bg-slate-200 border-b border-r ${parseInt(gainLoss) < 0 ? 'text-red-600' : parseInt(gainLoss) > 0 ? 'text-green-600' : ''}`}>
                  {formatEuroDecimalPriceFromString(gainLoss)}
                </div>
                <div
                  className={`p-3 text-right font-bold bg-slate-200 border-b border-r ${parseInt(gainLossPercentage) < 0 ? 'text-red-600' : parseInt(gainLossPercentage) > 0 ? 'text-green-600' : ''}`}>
                  {formatPercentageDecimalPriceFromString(gainLossPercentage)}
                </div>
              </React.Fragment>
            );
          },
        )}
    </>
  );
}
