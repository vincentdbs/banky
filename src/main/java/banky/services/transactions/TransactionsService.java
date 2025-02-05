package banky.services.transactions;

import banky.db.dao.TransactionsDao;
import banky.db.generated.Transactions;
import banky.webservices.api.transactions.requests.TransactionRequest;
import banky.webservices.api.transactions.responses.TransactionResponse;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;

@Singleton
public class TransactionsService {
    private final TransactionsDao transactionsDao;

    @Inject
    private TransactionsService(TransactionsDao transactionsDao) {
        this.transactionsDao = transactionsDao;
    }

    public List<TransactionResponse> fetchTransactions(Long page, Long size) {
        return transactionsDao.fetchTransactions(page, size);
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
