import { Injector } from 'plume-ts-di';
import TransfertsService from './TransfertsService';

/**
 * Registers transfert services dependencies in the injector
 */
export default function installTransfertsServices(injector: Injector) {
  injector.registerSingleton(TransfertsService);
}
