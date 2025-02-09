import CategoriesApi from '@api/categories/CategoriesApi';
import {
  CategoryResponse,
  SubCategoryNamesResponse,
  SubCategoryResponse,
} from '@api/categories/CategoriesTypes';
import { HttpPromise } from 'simple-http-rest-client';

export default class CategoriesService {
  constructor(private categoriesApi: CategoriesApi) {
  }

  fetchCategories(): HttpPromise<CategoryResponse[]> {
    return this.categoriesApi.fetchCategories();
  }

  fetchSubCategories(): HttpPromise<SubCategoryResponse[]> {
    return this.categoriesApi.fetchSubCategories();
  }

  fetchSubCategoryNames(): HttpPromise<SubCategoryNamesResponse[]> {
    return this.categoriesApi.fetchSubCategoryNames();
  }
}
