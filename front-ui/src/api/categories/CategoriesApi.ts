import ApiHttpClient from '@api/ApiHttpClient';
import {
  PaginatedCategoriesResponse,
  PaginatedSubCategoriesResponse,
  SubCategoryNamesResponse,
} from '@api/categories/CategoriesTypes';
import { HttpMethod } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';

/**
 * API client for interacting with category and subcategory endpoints
 */
export default class CategoriesApi {
  private static BASE_PATH: string = '/categories';

  constructor(private apiHttpClient: ApiHttpClient) {
  }

  fetchCategories = (page: number, size: number): HttpPromise<PaginatedCategoriesResponse> => this.apiHttpClient
    .restRequest<PaginatedCategoriesResponse>(HttpMethod.GET, CategoriesApi.BASE_PATH)
    .queryParams(
      [
        ['page', page],
        ['size', size],
      ],
    )
    .execute();

  /**
   * Fetches subcategories with pagination
   *
   * @param page The page number to retrieve (1-based)
   * @param size The number of items per page
   * @returns A promise with a paginated response containing subcategories
   */
  fetchPaginatedSubCategories = (page: number, size: number): HttpPromise<PaginatedSubCategoriesResponse> => this.apiHttpClient
    .restRequest<PaginatedSubCategoriesResponse>(HttpMethod.GET, `${CategoriesApi.BASE_PATH}/sub-categories`)
    .queryParams(
      [
        ['page', page],
        ['size', size],
      ],
    )
    .execute();

  fetchSubCategoryNames(): HttpPromise<SubCategoryNamesResponse[]> {
    return this.apiHttpClient
      .restRequest<SubCategoryNamesResponse[]>(HttpMethod.GET, `${CategoriesApi.BASE_PATH}/sub-categories/names/all`)
      .execute();
  }
}
