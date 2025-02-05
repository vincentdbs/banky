import { TransactionSide } from '@api/transactions/TransactionsTypes';
import ColoredIconsWrapper, { ICON_SIZE } from '@components/theme/icons/ColoredIconsWrapper';
import { LogIn, LogOut } from 'lucide-react';
import React from 'react';

type TransactionsSideIconProps = {
  side: TransactionSide,
};

export default function TransactionsSideIcon({ side }: TransactionsSideIconProps) {
  return (
    <ColoredIconsWrapper
      colorClassName={
        side === TransactionSide.DEBIT
          ? 'bg-red-500'
          : 'bg-green-500'
      }
    >
      {
        side === TransactionSide.CREDIT
          ? (
            <LogIn className={ICON_SIZE} />
          ) : (
            <LogOut className={ICON_SIZE} />
          )
      }
    </ColoredIconsWrapper>
  );
}
