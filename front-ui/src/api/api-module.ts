import installAccountsApi from '@api/accounts/accounts-api-module';
import installCategoriesApi from '@api/categories/categories-api-module';
import installTransactionsApi from '@api/transactions/transactions-api-module';
import { Injector } from 'plume-ts-di';
import ApiHttpClient from './ApiHttpClient';

export default function installApiModule(injector: Injector) {
  injector.registerSingleton(ApiHttpClient);
  installCategoriesApi(injector);
  installAccountsApi(injector);
  installTransactionsApi(injector);
}
