import { Injector } from 'plume-ts-di';
import TransactionsService from './TransactionsService';

export default function installTransactionsService(injector: Injector) {
  injector.registerSingleton(TransactionsService);
}
