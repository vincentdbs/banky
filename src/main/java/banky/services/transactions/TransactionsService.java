package banky.services.transactions;

import banky.db.dao.TransactionsDao;
import banky.db.generated.Transactions;
import banky.webservices.data.pagination.PaginatedResponse;
import banky.webservices.data.pagination.PaginationMeta;
import banky.webservices.api.transactions.requests.TransactionRequest;
import banky.webservices.api.transactions.responses.TransactionResponse;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;

import static banky.webservices.data.pagination.PaginationHelper.calculateTotalPages;

/**
 * Service responsible for transaction-related business logic.
 * Coordinates between web services and data access layer.
 */
@Singleton
public class TransactionsService {
    private final TransactionsDao transactionsDao;

    @Inject
    private TransactionsService(TransactionsDao transactionsDao) {
        this.transactionsDao = transactionsDao;
    }

    /**
     * Fetch transactions with pagination support.
     * 
     * @param page The page number to retrieve (1-based)
     * @param size The number of items per page
     * @return A paginated response containing transactions and pagination metadata
     */
    public PaginatedResponse<TransactionResponse> fetchTransactions(int page, int size) {
        // Calculate total elements and pages
        long totalElements = transactionsDao.countTransactions();
        int totalPages = calculateTotalPages(totalElements, size);
        
        // Ensure page is within bounds
        int adjustedPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
        
        // Get transactions for the page
        List<TransactionResponse> transactions = transactionsDao.fetchTransactions(adjustedPage, size);
        
        // Create pagination metadata
        PaginationMeta paginationMeta = new PaginationMeta(
            adjustedPage,
            totalPages,
            totalElements,
            size
        );
        
        return new PaginatedResponse<>(transactions, paginationMeta);
    }

    public Long createTransaction(TransactionRequest request) {
        Transactions transaction = new Transactions();
        transaction.setDate(request.date());
        transaction.setInBankDate(request.inBankDate());
        transaction.setAmount(request.amount());
        transaction.setAccountId(request.accountId());
        transaction.setFromToPersonName(request.fromToPersonName());
        transaction.setSubCategoryId(request.subCategoryId());
        transaction.setComment(request.comment());
        transaction.setTag(request.tag());
        transaction.setSide(request.side().toString());
        return transactionsDao.save(transaction).getId();
    }
}
