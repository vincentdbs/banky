import AccountsApi from '@api/accounts/AccountsApi';
import { Injector } from 'plume-ts-di';

export default function installAccountsApi(injector: Injector) {
  injector.registerSingleton(AccountsApi);
}
