import CategoriesApi from '@api/categories/CategoriesApi';
import { Injector } from 'plume-ts-di';

export default function installCategoriesApi(injector: Injector) {
  injector.registerSingleton(CategoriesApi);
}
