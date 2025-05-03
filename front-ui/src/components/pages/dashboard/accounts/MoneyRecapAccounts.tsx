import useMessages from '@i18n/hooks/messagesHook';
import { AccountType } from '@api/accounts/AccountsTypes';
import MoneyRecapAccount
  from '@components/pages/dashboard/accounts/account/MoneyRecapAccount';
import { Card, CardContent, CardHeader, CardTitle } from '@lib/shadcn/card';
import React from 'react';

type MoneyRecapAccountsProps = {};

export default function MoneyRecapAccounts(
  {}: MoneyRecapAccountsProps,
) {
  const { messages } = useMessages();

  return (
    <Card className="h-fit row-span-2 h-full">
      <CardHeader>
        <CardTitle>{messages.common.accounts}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-2">
        <MoneyRecapAccount
          color={'FF0000'}
          name="Account Name"
          shortName="AN"
          amount={100}
          subAmount={150}
          type={AccountType.CHECKING}
        />
        <MoneyRecapAccount
          color={'FF0000'}
          name="Account Name"
          shortName="AN"
          amount={100}
          subAmount={150}
          type={AccountType.CHECKING}
        />
      </CardContent>
    </Card>
  );
}