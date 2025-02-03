import installAccountsServices from '@services/accounts/accounts-services-module';
import installCategoriesServices from '@services/categories/categories-services-module';
import { Injector } from 'plume-ts-di';
import { Scheduler } from 'simple-job-scheduler';

export default function installServicesModule(injector: Injector) {
  injector.registerSingleton(Scheduler);

  installCategoriesServices(injector);
  installAccountsServices(injector);
}
