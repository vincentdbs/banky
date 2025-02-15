import { AccountResponse } from '@api/accounts/AccountsTypes';
import AccountCard from '@components/theme/cards/accounts/AccountsCard';
import React from 'react';

type AccountCardsProps = {
  accounts: AccountResponse[],
};

export default function AccountCards(
  {
    accounts,
  }: AccountCardsProps,
) {
  return (
    <div
      className="
        grid grid-cols-[repeat(1,1fr)]
        sm:grid-cols-[repeat(2,1fr)]
        lg:grid-cols-[repeat(3,1fr)]
        xl:grid-cols-[repeat(4,1fr)] gap-5"
    >
      {
        accounts.map((account: AccountResponse) => (
          <AccountCard
            key={account.id}
            color={account.colorCode}
            name={account.name}
            shortName={account.shortName}
            initialAmount={account.initialAmount}
            type={account.type}
          />
        ))
      }
    </div>
  );
}
