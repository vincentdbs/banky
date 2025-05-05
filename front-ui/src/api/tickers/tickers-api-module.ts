import { Injector } from 'plume-ts-di';
import TickersApi from './TickersApi';

/**
 * Registers tickers API dependencies in the injector
 */
export default function installTickersApi(injector: Injector) {
  injector.registerSingleton(TickersApi);
}