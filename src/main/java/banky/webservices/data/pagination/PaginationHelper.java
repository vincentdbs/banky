package banky.webservices.data.pagination;

public class PaginationHelper {
    public static final int DEFAULT_PAGE_SIZE = 20;
    public static final int DEFAULT_PAGE = 1;

    private PaginationHelper() {
        // Prevent instantiation
    }

    public static int calculateTotalPages(long totalElements, int pageSize) {
        return (int) Math.ceil((double) totalElements / pageSize);
    }
}
