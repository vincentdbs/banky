package banky.services.tickers;

import banky.db.dao.TickerDao;
import banky.db.generated.Ticker;
import banky.webservices.api.tickers.requests.TickerRequest;
import banky.webservices.api.tickers.responses.TickerResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import banky.webservices.data.pagination.PaginationMeta;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;

/**
 * Service handling business logic related to financial tickers
 */
@Singleton
public class TickerService {

    private final TickerDao tickerDao;

    @Inject
    private TickerService(TickerDao tickerDao) {
        this.tickerDao = tickerDao;
    }

    /**
     * Fetch tickers with pagination support.
     * 
     * @param page The page number to retrieve (1-based)
     * @param size The number of items per page
     * @return A paginated response containing tickers and pagination metadata
     */
    public PaginatedResponse<TickerResponse> fetchPaginatedTickers(int page, int size) {
        // Calculate total elements and pages
        long totalElements = tickerDao.countTickers();
        int totalPages = calculateTotalPages(totalElements, size);
        
        // Ensure page is within bounds
        int adjustedPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
        
        // Get tickers for the page
        List<TickerResponse> tickers = tickerDao.fetchTickersPaginated(adjustedPage, size);
        
        // Create pagination metadata
        PaginationMeta paginationMeta = new PaginationMeta(
            adjustedPage,
            totalPages,
            totalElements,
            size
        );
        
        return new PaginatedResponse<>(tickers, paginationMeta);
    }

    /**
     * Creates a new ticker with the provided details
     *
     * @param request The ticker details to create
     * @return The ID of the newly created ticker
     */
    public Long createTicker(TickerRequest request) {
        Ticker ticker = new Ticker();
        ticker.setName(request.name());
        ticker.setShortName(request.shortName());
        ticker.setCategory(request.category().name());
        
        return tickerDao.save(ticker).getId();
    }
    
    private int calculateTotalPages(long totalElements, int pageSize) {
        return (int) Math.ceil((double) totalElements / pageSize);
    }
}