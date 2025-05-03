import { Injector } from 'plume-ts-di';
import DashboardService from './DashboardService';

/**
 * Registers dashboard services with the dependency injection container.
 */
export default function installDashboardServices(injector: Injector) {
  injector.registerSingleton(DashboardService);
}