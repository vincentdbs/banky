package banky.services.transfert;

import banky.db.dao.TransfertDao;
import banky.db.generated.Transfert;
import banky.webservices.api.transfert.requests.TransfertRequest;
import banky.webservices.api.transfert.responses.TransfertResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import banky.webservices.data.pagination.PaginationMeta;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;

/**
 * Service handling business logic related to transfers between accounts
 */
@Singleton
public class TransfertService {

    private final TransfertDao transfertDao;

    @Inject
    private TransfertService(TransfertDao transfertDao) {
        this.transfertDao = transfertDao;
    }

    /**
     * Fetch transfers with pagination support.
     * 
     * @param page The page number to retrieve (1-based)
     * @param size The number of items per page
     * @return A paginated response containing transfers and pagination metadata
     */
    public PaginatedResponse<TransfertResponse> fetchPaginatedTransferts(int page, int size) {
        // Calculate total elements and pages
        long totalElements = transfertDao.countTransferts();
        int totalPages = calculateTotalPages(totalElements, size);
        
        // Ensure page is within bounds
        int adjustedPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
        
        // Get transferts for the page
        List<TransfertResponse> transferts = transfertDao.fetchTransfertsPaginated(adjustedPage, size);
        
        // Create pagination metadata
        PaginationMeta paginationMeta = new PaginationMeta(
            adjustedPage,
            totalPages,
            totalElements,
            size
        );
        
        return new PaginatedResponse<>(transferts, paginationMeta);
    }

    /**
     * Creates a new transfer between accounts
     *
     * @param request The transfer details including source account, destination account, amount and date
     * @return The ID of the newly created transfer
     */
    public Long createTransfert(TransfertRequest request) {
        Transfert transfert = new Transfert();
        transfert.setFromAccountId(request.fromAccountId());
        transfert.setToAccountId(request.toAccountId());
        transfert.setAmount(request.amount());
        transfert.setDate(request.date());
        
        return transfertDao.save(transfert).getId();
    }
    
    private int calculateTotalPages(long totalElements, int pageSize) {
        return (int) Math.ceil((double) totalElements / pageSize);
    }
}