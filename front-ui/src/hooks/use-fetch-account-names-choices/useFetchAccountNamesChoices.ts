import { AccountNamesResponse } from '@api/accounts/AccountsTypes';
import { Choice } from '@components/theme/form/select/Select';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import AccountsService from '@services/accounts/AccountsService';
import { getGlobalInstance } from 'plume-ts-di';
import { useState } from 'react';

type UseFetchAccountNamesChoices = {
  choices: Choice[],
}

export default function useFetchAccountNamesChoices(): UseFetchAccountNamesChoices {
  const accountsService: AccountsService = getGlobalInstance(AccountsService);

  const [accountNameChoices, setAccountNameChoices] = useState<Choice[]>([]);

  useOnComponentMounted(() => {
    accountsService.fetchAccountNames()
      .then((names: AccountNamesResponse[]) => setAccountNameChoices(
        names.map((name: AccountNamesResponse) => {
          return (
            {
              label: name.name,
              value: name.id,
            }
          );
        }),
      ));
  });

  return { choices: accountNameChoices };
}