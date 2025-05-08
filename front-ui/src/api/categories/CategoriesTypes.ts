export type CategoryResponse = {
  id: string,
  name: string,
  numberOfSubCategories: number,
};

export type SubCategoryResponse = {
  id: string,
  categoryId: string,
  name: string,
  category: string,
};

export type SubCategoryNamesResponse = {
  id: string,
  categoryId: string,
  name: string,
};

export type CategoryRequest = {
  name: string,
};

export type SubCategoryRequest = {
  name: string,
};

/**
 * Pagination metadata containing information about the current page state
 */
export type PaginationMeta = {
  currentPage: number,
  totalPages: number,
  totalElements: number,
  size: number,
};

/**
 * Paginated response for categories
 */
export type PaginatedCategoriesResponse = {
  content: CategoryResponse[],
  pagination: PaginationMeta,
};

/**
 * Paginated response for subcategories
 */
export type PaginatedSubCategoriesResponse = {
  content: SubCategoryResponse[],
  pagination: PaginationMeta,
};