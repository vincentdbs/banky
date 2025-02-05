import AccountsApi from '@api/accounts/AccountsApi';
import { Injector } from 'plume-ts-di';

export default function installTransactionsApi(injector: Injector) {
  injector.registerSingleton(AccountsApi);
}
