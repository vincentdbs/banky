import { Injector } from 'plume-ts-di';
import OrdersService from './OrdersService';

/**
 * Registers orders services with the dependency injection container.
 */
export default function installOrdersServices(injector: Injector) {
  injector.registerSingleton(OrdersService);
}
