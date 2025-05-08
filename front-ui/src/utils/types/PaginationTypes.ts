/**
 * Common pagination types to be used across the application.
 * These types standardize the pagination mechanism for API requests and responses.
 */

// Request pagination parameters
export type PaginationParams = {
  page: number,
  size: number,
};

// Response pagination metadata
export type PaginationMeta = {
  currentPage: number,
  totalPages: number,
  totalElements: number,
  size: number,
};

// Generic paginated response
export type PaginatedResponse<T> = {
  content: T[],
  pagination: PaginationMeta,
};
