import { AccountResponse } from '@api/accounts/AccountsTypes';
import AccountCards from '@components/pages/parameters/accounts/cards/AccountCards';
import MainSection from '@components/theme/sections/MainSection';
import useMessages from '@i18n/hooks/messagesHook';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import AccountsService from '@services/accounts/AccountsService';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';

export default function Accounts() {
  const accountService: AccountsService = getGlobalInstance(AccountsService);

  const { httpError } = useMessages();
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);

  useOnComponentMounted(() => {
    accountService
      .fetchAccounts()
      .then(setAccounts)
      .catch(httpError);
  });

  return (
    <MainSection>
      <AccountCards accounts={accounts} />
    </MainSection>
  );
}
