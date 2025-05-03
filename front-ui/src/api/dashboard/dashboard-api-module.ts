import { Injector } from 'plume-ts-di';
import DashboardApi from './DashboardApi';

/**
 * Registers dashboard API services with the dependency injection container.
 */
export default function installDashboardApi(injector: Injector) {
  injector.registerSingleton(DashboardApi);
}