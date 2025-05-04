package banky.webservices.data.pagination;

/**
 * Pagination metadata containing information about the current page state.
 * Used to help clients navigate through paginated data.
 */
public record PaginationMeta (
    int currentPage,
    int totalPages,
    long totalElements,
    int size
) {
}