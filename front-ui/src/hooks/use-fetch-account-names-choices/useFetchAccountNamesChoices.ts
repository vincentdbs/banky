import { AccountNamesResponse, AccountType } from '@api/accounts/AccountsTypes';
import { Choice } from '@components/theme/form/select/AutocompleteUncontrolledSelect';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import AccountsService from '@services/accounts/AccountsService';
import { getGlobalInstance } from 'plume-ts-di';
import { useState } from 'react';

type UseFetchAccountNamesChoices = {
  choices: Choice[],
};

export default function useFetchAccountNamesChoices(accountTypes?: AccountType[]): UseFetchAccountNamesChoices {
  const accountsService: AccountsService = getGlobalInstance(AccountsService);

  const [accountNameChoices, setAccountNameChoices] = useState<Choice[]>([]);

  useOnComponentMounted(() => {
    accountsService.fetchAccountNames(accountTypes)
      .then((names: AccountNamesResponse[]) => setAccountNameChoices(
        names.map((name: AccountNamesResponse) => (
          {
            label: name.name,
            value: name.id,
          }
        )),
      ));
  });

  return { choices: accountNameChoices };
}
