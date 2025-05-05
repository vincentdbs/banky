import ApiHttpClient from '@api/ApiHttpClient';
import {
  CategoryResponse,
  PaginatedCategoriesResponse,
  SubCategoryNamesResponse,
  SubCategoryResponse,
} from '@api/categories/CategoriesTypes';
import { HttpMethod } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';

export default class CategoriesApi {
  private static BASE_PATH: string = '/categories';

  constructor(private apiHttpClient: ApiHttpClient) {
  }

  fetchCategories = (page: number, size: number): HttpPromise<PaginatedCategoriesResponse> => {
    return this.apiHttpClient
      .restRequest<PaginatedCategoriesResponse>(HttpMethod.GET, CategoriesApi.BASE_PATH)
      .queryParams(
        [
          ['page', page],
          ['size', size],
        ],
      )
      .execute();
  };

  /**
   * @deprecated Use fetchCategories with pagination instead
   */
  fetchAllCategories(): HttpPromise<CategoryResponse[]> {
    return this.apiHttpClient
      .restRequest<CategoryResponse[]>(HttpMethod.GET, CategoriesApi.BASE_PATH)
      .execute();
  }

  fetchSubCategories(): HttpPromise<SubCategoryResponse[]> {
    return this.apiHttpClient
      .restRequest<SubCategoryResponse[]>(HttpMethod.GET, `${CategoriesApi.BASE_PATH}/sub-categories`)
      .execute();
  }

  fetchSubCategoryNames(): HttpPromise<SubCategoryNamesResponse[]> {
    return this.apiHttpClient
      .restRequest<SubCategoryNamesResponse[]>(HttpMethod.GET, `${CategoriesApi.BASE_PATH}/sub-categories/names`)
      .execute();
  }
}
