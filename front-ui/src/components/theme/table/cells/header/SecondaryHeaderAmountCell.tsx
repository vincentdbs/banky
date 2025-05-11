import { computeColorClass, formatEuroDecimalPriceFromString } from '@utils/number/NumberUtils';
import React from 'react';
import SecondaryHeaderCell from './SecondaryHeaderCell';

type SecondaryHeaderAmountCellProps = {
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
export default function SecondaryHeaderAmountCell(
  {
    amount,
    align = 'left',
    type = 'amount',
    decimals,
    className = '',
  }: SecondaryHeaderAmountCellProps,
) {
  return (
    <SecondaryHeaderCell align={align} className={`${computeColorClass(amount)} ${className}`}>
      {
        type === 'percentage'
          ? formatEuroDecimalPriceFromString(amount, decimals)
          : formatEuroDecimalPriceFromString(amount, decimals)
      }
    </SecondaryHeaderCell>
  );
}
