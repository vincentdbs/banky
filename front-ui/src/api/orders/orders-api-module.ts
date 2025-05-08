import { Injector } from 'plume-ts-di';
import OrdersApi from './OrdersApi';

/**
 * Registers orders API dependencies in the injector
 */
export default function installOrdersApi(injector: Injector) {
  injector.registerSingleton(OrdersApi);
}
