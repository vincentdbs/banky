package banky.webservices.validators;

import banky.db.dao.TransfertDao;
import banky.db.generated.Transfert;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.NotFoundException;

/**
 * Validator for transaction-related operations.
 * Contains methods to validate transaction data and check for transaction existence.
 */
@Singleton
public class TransfertsValidator {

    private final TransfertDao transfertDao;

    @Inject
    private TransfertsValidator(TransfertDao transfertDao) {
        this.transfertDao = transfertDao;
    }
    
    /**
     * Check if a transfert exists and return it if it does.
     * 
     * @param id The ID of the transfert to check
     * @return The transfert if it exists
     * @throws NotFoundException if the transfert does not exist
     */
    public Transfert checkTransfertExists(Long id) {
        Transfert transfert = transfertDao.findById(id);

        if (transfert == null) {
            throw new NotFoundException("Transfert with ID " + id + " not found");
        }

        return transfert;
    }
}
