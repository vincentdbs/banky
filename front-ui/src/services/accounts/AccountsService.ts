import AccountsApi from '@api/accounts/AccountsApi';
import { AccountNamesResponse, AccountRequest, AccountResponse, AccountType } from '@api/accounts/AccountsTypes';
import { HttpPromise } from 'simple-http-rest-client';

export default class AccountsService {
  private static BASE_PATH: string = '/accounts';

  constructor(private readonly accountsApi: AccountsApi) {}

  fetchAccounts(): HttpPromise<AccountResponse[]> {
    return this.accountsApi.fetchAccounts();
  }

  fetchAccountNames(accountTypes?: AccountType[]): HttpPromise<AccountNamesResponse[]> {
    return this.accountsApi.fetchAccountNames(accountTypes);
  }

  createAccount(request: AccountRequest): HttpPromise<number> {
    return this.accountsApi.createAccount(request);
  }

  updateAccount(id: string, request: AccountRequest): HttpPromise<void> {
    return this.accountsApi.updateAccount(id, request);
  }
}
