import { formatEuroDecimalPrice } from '@/utils/number/NumberUtils';
import { AccountType } from '@api/accounts/AccountsTypes';
import AccountTypeLogo from '@components/theme/icons/account-type/AccountTypeIcon';
import ColoredIconsWrapper from '@components/theme/icons/ColoredIconsWrapper';
import React from 'react';

type MoneyRecapAccountProps = {
  color: string,
  name: string,
  shortName: string,
  amount: number,
  inBankAmount: number,
  type: AccountType,
};

export default function MoneyRecapAccount(
  {
    color,
    name,
    shortName,
    amount,
    inBankAmount,
    type,
  }: MoneyRecapAccountProps,
) {
  return (
    <div
      className="
        grid grid-cols-[auto_auto_1fr] auto-rows-[1fr] items-center justify-between
        gap-4 flex-grow-0 w-full
      "
    >
      <ColoredIconsWrapper backgroundColorInlineStyle={`#${color}`}>
        <AccountTypeLogo type={type} />
      </ColoredIconsWrapper>
      <div className="flex flex-col gap-0.5 leading-none">
        <p>{name}</p>
        <p className="text-sm text-muted-foreground">{shortName}</p>
      </div>
      <div>
        <div>
          <p className="text-right">{formatEuroDecimalPrice(amount)}</p>
          <p className="text-xs text-right text-muted-foreground">{formatEuroDecimalPrice(inBankAmount)}</p>
        </div>
      </div>
    </div>
  );
}
