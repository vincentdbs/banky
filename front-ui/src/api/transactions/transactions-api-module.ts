import TransactionsApi from '@api/transactions/TransactionsApi';
import { Injector } from 'plume-ts-di';

export default function installTransactionsApi(injector: Injector) {
  injector.registerSingleton(TransactionsApi);
}
