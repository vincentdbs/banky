import { AccountType } from '@api/accounts/AccountsTypes';
import AccountTypeLogo from '@components/theme/icons/account-type/AccountTypeIcon';
import ColoredIconsWrapper from '@components/theme/icons/ColoredIconsWrapper';
import { Card } from '@lib/shadcn/card';
import React from 'react';

type AccountsCardProps = {
  color: string,
  name: string,
  shortName: string,
  initialAmount: number,
  type: AccountType,
};

export default function AccountsCard(
  {
    color,
    name,
    shortName,
    initialAmount,
    type,
  }: AccountsCardProps,
) {
  return (
    <Card
      className="
        grid grid-cols-[auto_auto_1fr] auto-rows-[1fr] items-center justify-between
        gap-4 flex-[400px] flex-grow-0 py-2 px-4
      "
    >
      <ColoredIconsWrapper backgroundColorInlineStyle={`#${color}`}>
        <AccountTypeLogo type={type} />
      </ColoredIconsWrapper>
      <div className="flex flex-col gap-0.5 leading-none">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-muted-foreground">{shortName}</p>
      </div>
      <p className="text-right">{`${initialAmount} €`}</p>
    </Card>
  );
}
