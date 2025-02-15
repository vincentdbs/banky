import { AccountType } from '@api/accounts/AccountsTypes';
import { ICON_SIZE } from '@components/theme/icons/ColoredIconsWrapper';
import { Landmark, PiggyBank, Wallet } from 'lucide-react';
import React from 'react';

export default function AccountTypeLogo({ type }: { type: AccountType }) {
  switch (type) {
    case AccountType.CHECKING:
      return <Wallet className={ICON_SIZE} />;
    case AccountType.SAVINGS:
      return <PiggyBank className={ICON_SIZE} />;
    case AccountType.MARKET:
      return <Landmark className={ICON_SIZE} />;
    default:
      return <span>?</span>;
  }
}