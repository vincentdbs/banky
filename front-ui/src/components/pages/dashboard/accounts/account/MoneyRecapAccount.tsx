import { AccountType } from '@api/accounts/AccountsTypes';
import { formatEuroDecimalPriceFromString } from '@utils/number/NumberUtils';
import { isNotNullish } from '@utils/types/TypesUtils';
import AccountTypeLogo from '@components/theme/icons/account-type/AccountTypeIcon';
import ColoredIconsWrapper from '@components/theme/icons/ColoredIconsWrapper';
import React from 'react';
import { isNotNullish } from '@/utils/types/TypesUtils';
import { formatEuroDecimalPriceFromString } from '@/utils/number/NumberUtils';

type MoneyRecapAccountProps = {
  color: string,
  name: string,
  shortName: string,
  amount: string,
  subAmount?: string,
  type: AccountType,
};

export default function MoneyRecapAccount(
  {
    color,
    name,
    shortName,
    amount,
    subAmount,
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
          <p className="text-right">{formatEuroDecimalPriceFromString(amount)}</p>
          {
            isNotNullish(subAmount)
            && (
              <p className="text-xs text-muted-foreground text-right">
                {formatEuroDecimalPriceFromString(subAmount)}
              </p>
            )
          }
        </div>
      </div>
    </div>
  );
}
