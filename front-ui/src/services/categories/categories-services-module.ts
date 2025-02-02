import CategoriesService from '@services/categories/CategoriesService';
import { Injector } from 'plume-ts-di';

export default function installCategoriesServices(injector: Injector) {
  injector.registerSingleton(CategoriesService);
}
