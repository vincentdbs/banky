package banky.services.transfert;

import banky.db.dao.TransfertDao;
import banky.db.generated.Transfert;
import banky.webservices.api.transfert.requests.TransfertRequest;
import banky.webservices.api.transfert.responses.TransfertResponse;
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
     * Retrieves all transfers with account details
     *
     * @return List of transfers with source and destination account information
     */
    public List<TransfertResponse> fetchTransferts() {
        return transfertDao.fetchTransferts();
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
}