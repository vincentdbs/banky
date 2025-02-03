import { AccountType } from '@api/accounts/AccountsTypes';
import { Card } from '@lib/shadcn/card';
import { Landmark, PiggyBank, Wallet } from 'lucide-react';
import React from 'react';

type AccountsCardProps = {
  color: string,
  name: string,
  shortName: string,
  initialAmount: number,
  type: AccountType,
};

function AccountTypeLogo({ type }: { type: AccountType }) {
  switch (type) {
    case AccountType.CHECKING:
      return <Wallet className="size-5" />;
    case AccountType.SAVINGS:
      return <PiggyBank className="size-5" />;
    case AccountType.MARKET:
      return <Landmark className="size-5" />;
    default:
      return <span>?</span>;
  }
}

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
    <Card className="grid grid-cols-[auto_auto_1fr] auto-rows-[1fr] items-center justify-between gap-4 flex-[400px] flex-grow-0 py-2 px-4">
      <div
        className={`
          flex aspect-square size-8
          items-center justify-center rounded-lg
          text-sidebar-primary-foreground
        `}
        style={
          {
            backgroundColor: `#${color}`,
          }
        }
      >
        <AccountTypeLogo type={type} />
      </div>
      <div className="flex flex-col gap-0.5 leading-none">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-muted-foreground">{shortName}</p>
      </div>
      <p className="text-right">{`${initialAmount} €`}</p>
    </Card>
  );
}
