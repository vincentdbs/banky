import installAccountsServices from '@services/accounts/accounts-services-module';
import installCategoriesServices from '@services/categories/categories-services-module';
import installDashboardServices from '@services/dashboard/dashboard-services-module';
import installEvolutionService from '@services/evolution/evolution-service-module';
import installOrdersServices from '@services/orders/orders-services-module';
import installTickersServices from '@services/tickers/tickers-services-module';
import installTransactionsService from '@services/transactions/transactions-services-module';
import installTransfertsServices from '@services/transferts/transferts-services-module';
import { Injector } from 'plume-ts-di';
import { Scheduler } from 'simple-job-scheduler';

export default function installServicesModule(injector: Injector) {
  injector.registerSingleton(Scheduler);

  installCategoriesServices(injector);
  installAccountsServices(injector);
  installTransactionsService(injector);
  installDashboardServices(injector);
  installTransfertsServices(injector);
  installOrdersServices(injector);
  installTickersServices(injector);
  installEvolutionService(injector);
}
