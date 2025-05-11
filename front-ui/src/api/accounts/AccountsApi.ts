import {
  AccountNamesResponse,
  AccountRequest,
  AccountResponse,
  AccountType,
} from '@api/accounts/AccountsTypes';
import ApiHttpClient from '@api/ApiHttpClient';
import { HttpMethod, HttpQueryParam } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';

export default class AccountsApi {
  private static BASE_PATH: string = '/accounts';

  constructor(private apiHttpClient: ApiHttpClient) {
  }

  fetchAccounts(): HttpPromise<AccountResponse[]> {
    return this.apiHttpClient
      .restRequest<AccountResponse[]>(HttpMethod.GET, AccountsApi.BASE_PATH)
      .execute();
  }

  fetchAccountNames(accountTypes: AccountType[] = []): HttpPromise<AccountNamesResponse[]> {
    const queryParams: HttpQueryParam[] = [];

    for (const type of accountTypes) {
      queryParams.push(['type', type]);
    }

    return this.apiHttpClient
      .restRequest<AccountNamesResponse[]>(HttpMethod.GET, `${AccountsApi.BASE_PATH}/names`)
      .queryParams(queryParams)
      .execute();
  }

  createAccount(request: AccountRequest): HttpPromise<number> {
    return this.apiHttpClient
      .restRequest<number>(HttpMethod.POST, AccountsApi.BASE_PATH)
      .jsonBody(request)
      .execute();
  }

  updateAccount(id: string, request: AccountRequest): HttpPromise<void> {
    return this.apiHttpClient
      .restRequest<void>(HttpMethod.PUT, `${AccountsApi.BASE_PATH}/${id}`)
      .jsonBody(request)
      .execute();
  }
}
