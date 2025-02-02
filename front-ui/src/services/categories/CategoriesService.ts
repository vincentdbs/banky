import CategoriesApi from '@api/categories/CategoriesApi';
import { CategoryResponse } from '@api/categories/CategoriesTypes';
import { HttpPromise } from 'simple-http-rest-client';

export default class CategoriesService {
  constructor(private categoriesApi: CategoriesApi) {
  }

  fetchCategories(): HttpPromise<CategoryResponse[]> {
    return this.categoriesApi.fetchCategories();
  }
}