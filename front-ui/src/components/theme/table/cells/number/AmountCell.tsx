import { computeColorClass, formatEuroDecimalPriceFromString } from '@utils/number/NumberUtils';
import React from 'react';
import BaseCell from '../base/BaseCell';

type AmountCellProps = {
  amount: string,
  decimals?: number,
  type?: 'amount' | 'percentage',
  className?: string,
};

/**
 * Cell component for displaying monetary amounts
 * Shows negative values in red and applies text-right alignment
 */
export default function AmountCell({
  amount, decimals, type = 'amount', className = '',
}: AmountCellProps) {
  return (
    <BaseCell className={`text-right ${computeColorClass(amount)} ${className}`}>
      {
        type === 'percentage'
          ? formatEuroDecimalPriceFromString(amount, decimals)
          : formatEuroDecimalPriceFromString(amount, decimals)
      }
    </BaseCell>
  );
}
