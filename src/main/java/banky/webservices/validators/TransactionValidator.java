package banky.webservices.validators;

import banky.db.dao.TransactionsDao;
import banky.db.generated.Transactions;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.NotFoundException;

/**
 * Validator for transaction-related operations.
 * Contains methods to validate transaction data and check for transaction existence.
 */
@Singleton
public class TransactionValidator {
    
    private final TransactionsDao transactionsDao;
    
    @Inject
    private TransactionValidator(TransactionsDao transactionsDao) {
        this.transactionsDao = transactionsDao;
    }
    
    /**
     * Check if a transaction exists and return it if it does.
     * 
     * @param id The ID of the transaction to check
     * @return The transaction if it exists
     * @throws NotFoundException if the transaction does not exist
     */
    public Transactions checkTransactionExists(Long id) {
        Transactions transaction = transactionsDao.findById(id);

        if (transaction == null) {
            throw new NotFoundException("Transaction with ID " + id + " not found");
        }

        return transaction;
    }
}
