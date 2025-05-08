import { Injector } from 'plume-ts-di';
import EvolutionService from './EvolutionService';

/**
 * Registers evolution service dependencies in the injector
 */
export default function installEvolutionService(injector: Injector) {
  injector.registerSingleton(EvolutionService);
}
