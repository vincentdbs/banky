import { Injector } from 'plume-ts-di';
import TransactionsService from './TransactionsService';

export default function installAccountsServices(injector: Injector) {
  injector.registerSingleton(TransactionsService);
}
