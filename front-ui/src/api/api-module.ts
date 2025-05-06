import installAccountsApi from '@api/accounts/accounts-api-module';
import installCategoriesApi from '@api/categories/categories-api-module';
import installDashboardApi from '@api/dashboard/dashboard-api-module';
import installEvolutionApi from '@api/evolution/evolution-api-module';
import installOrdersApi from '@api/orders/orders-api-module';
import installTickersApi from '@api/tickers/tickers-api-module';
import installTransactionsApi from '@api/transactions/transactions-api-module';
import installTransfertsApi from '@api/transferts/transferts-api-module';
import { Injector } from 'plume-ts-di';
import ApiHttpClient from './ApiHttpClient';

export default function installApiModule(injector: Injector) {
  injector.registerSingleton(ApiHttpClient);
  installCategoriesApi(injector);
  installAccountsApi(injector);
  installTransactionsApi(injector);
  installDashboardApi(injector);
  installTransfertsApi(injector);
  installOrdersApi(injector);
  installTickersApi(injector);
  installEvolutionApi(injector);
}
