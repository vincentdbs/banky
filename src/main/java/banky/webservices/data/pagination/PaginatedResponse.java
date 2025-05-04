package banky.webservices.data.pagination;

import java.util.List;

/**
 * Generic paginated response that wraps content with pagination metadata.
 * Used for standardizing paginated responses across the application.
 * @param <T> The type of content in the response
 */
public record PaginatedResponse<T> (
    List<T> content,
    PaginationMeta pagination
) {
}