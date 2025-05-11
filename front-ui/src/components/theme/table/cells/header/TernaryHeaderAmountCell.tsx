import TernaryHeaderCell from '@components/theme/table/cells/header/TernaryHeaderCell';
import { computeColorClass, formatEuroDecimalPriceFromString } from '@utils/number/NumberUtils';
import React from 'react';

type TernaryHeaderAmountCellProps = {
  amount: string,
  align?: 'left' | 'center' | 'right',
  type?: 'amount' | 'percentage',
  decimals?: number,
  className?: string,
};

/**
 * Subheader cell component with lighter background styling and font weight
 * Used for subheadings like subtotals in tables
 */
export default function TernaryHeaderAmountCell(
  {
    amount,
    align = 'left',
    type = 'amount',
    decimals,
    className = '',
  }: TernaryHeaderAmountCellProps,
) {
  return (
    <TernaryHeaderCell align={align} className={`${computeColorClass(amount)} ${className}`}>
      {
        type === 'percentage'
          ? formatEuroDecimalPriceFromString(amount, decimals)
          : formatEuroDecimalPriceFromString(amount, decimals)
      }
    </TernaryHeaderCell>
  );
}
