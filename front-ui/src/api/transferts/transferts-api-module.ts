import { Injector } from 'plume-ts-di';
import TransfertsApi from './TransfertsApi';

/**
 * Registers transfert API dependencies in the injector
 */
export default function installTransfertsApi(injector: Injector) {
  injector.registerSingleton(TransfertsApi);
}