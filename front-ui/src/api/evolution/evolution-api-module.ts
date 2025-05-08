import { Injector } from 'plume-ts-di';
import EvolutionApi from './EvolutionApi';

/**
 * Registers the Evolution API in the dependency injection container
 */
export default function installEvolutionApi(injector: Injector) {
  injector.registerSingleton(EvolutionApi);
}
