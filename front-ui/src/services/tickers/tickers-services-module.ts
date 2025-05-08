import { Injector } from 'plume-ts-di';
import TickersService from './TickersService';

/**
 * Registers tickers services dependencies in the injector
 */
export default function installTickersServices(injector: Injector) {
  injector.registerSingleton(TickersService);
}
