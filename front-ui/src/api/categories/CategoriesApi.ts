import ApiHttpClient from '@api/ApiHttpClient';
import { CategoryResponse } from '@api/categories/CategoriesTypes';
import { HttpMethod } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';

export default class CategoriesApi {
  private static BASE_PATH = '/categories';

  constructor(private apiHttpClient: ApiHttpClient) {
  }

  fetchCategories(): HttpPromise<CategoryResponse[]> {
    return this.apiHttpClient
      .restRequest<CategoryResponse[]>(HttpMethod.GET, CategoriesApi.BASE_PATH)
      .execute();
  }
}