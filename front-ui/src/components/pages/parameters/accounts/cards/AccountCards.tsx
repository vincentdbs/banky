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
    <div className="flex flex-wrap gap-5 justify-center">
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
