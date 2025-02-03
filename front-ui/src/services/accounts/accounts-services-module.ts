import { Injector } from 'plume-ts-di';
import AccountsService from './AccountsService';

export default function installAccountsServices(injector: Injector) {
  injector.registerSingleton(AccountsService);
}
