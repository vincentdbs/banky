import CategoriesApi from '@api/categories/CategoriesApi';
import {
  PaginatedCategoriesResponse,
  PaginatedSubCategoriesResponse,
  SubCategoryNamesResponse,
} from '@api/categories/CategoriesTypes';
import { HttpPromise } from 'simple-http-rest-client';

/**
 * Service for handling category and subcategory operations
 */
export default class CategoriesService {
  // Default pagination values
  private static readonly DEFAULT_PAGE_SIZE = 20;
  private static readonly DEFAULT_PAGE = 1;

  constructor(private categoriesApi: CategoriesApi) {
  }

  /**
   * Fetches categories with pagination support
   * 
   * @param page The page number to retrieve (defaults to 1)
   * @param size The number of items per page (defaults to 20)
   * @returns A promise with a paginated response containing categories
   */
  fetchPaginatedCategories = (
    page: number = CategoriesService.DEFAULT_PAGE,
    size: number = CategoriesService.DEFAULT_PAGE_SIZE,
  ): HttpPromise<PaginatedCategoriesResponse> => {
    return this.categoriesApi.fetchCategories(page, size);
  };

  /**
   * Fetches subcategories with pagination support
   * 
   * @param page The page number to retrieve (defaults to 1)
   * @param size The number of items per page (defaults to 20)
   * @returns A promise with a paginated response containing subcategories
   */
  fetchPaginatedSubCategories = (
    page: number = CategoriesService.DEFAULT_PAGE,
    size: number = CategoriesService.DEFAULT_PAGE_SIZE,
  ): HttpPromise<PaginatedSubCategoriesResponse> => {
    return this.categoriesApi.fetchPaginatedSubCategories(page, size);
  };

  fetchSubCategoryNames(): HttpPromise<SubCategoryNamesResponse[]> {
    return this.categoriesApi.fetchSubCategoryNames();
  }
}
