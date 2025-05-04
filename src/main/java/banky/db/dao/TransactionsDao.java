package banky.db.dao;

import banky.db.generated.QAccounts;
import banky.db.generated.QCategory;
import banky.db.generated.QSubCategory;
import banky.db.generated.Transactions;
import banky.db.generated.QTransactions;
import banky.services.transactions.enums.TransactionSide;
import banky.webservices.api.transactions.responses.TransactionResponse;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import java.util.List;

/**
 * Data Access Object for transaction operations.
 * Provides database access methods for transaction data with pagination support.
 */
@Singleton
public class TransactionsDao extends CrudDaoQuerydsl<Transactions> {

    @Inject
    private TransactionsDao(TransactionManagerQuerydsl transactionManagerQuerydsl) {
        super(transactionManagerQuerydsl, QTransactions.transactions);
    }

    /**
     * Fetch transactions with pagination support
     * 
     * @param page The page number (1-based)
     * @param size The number of items per page
     * @return A list of transactions for the requested page
     */
    public List<TransactionResponse> fetchTransactions(int page, int size) {
        int offset = (page - 1) * size; // Convert to 0-based for database query
        
        return this.transactionManager
            .selectQuery()
            .select(
                QTransactions.transactions.id,
                QTransactions.transactions.date,
                QTransactions.transactions.inBankDate,
                QTransactions.transactions.amount,
                QAccounts.accounts.id,
                QAccounts.accounts.shortName,
                QAccounts.accounts.color,
                QCategory.category.id,
                QSubCategory.subCategory.id,
                QSubCategory.subCategory.name,
                QTransactions.transactions.comment,
                QTransactions.transactions.tag,
                QTransactions.transactions.side,
                QTransactions.transactions.fromToPersonName
            )
            .from(QTransactions.transactions)
            .innerJoin(QAccounts.accounts)
            .on(QTransactions.transactions.accountId.eq(QAccounts.accounts.id))
            .innerJoin(QSubCategory.subCategory)
            .on(QTransactions.transactions.subCategoryId.eq(QSubCategory.subCategory.id))
            .innerJoin(QCategory.category)
            .on(QSubCategory.subCategory.categoryId.eq(QCategory.category.id))
            .offset(offset)
            .limit(size)
            .orderBy(QTransactions.transactions.date.desc())
            .fetch()
            .stream()
            .map(
                transaction -> new TransactionResponse(
                    transaction.get(QTransactions.transactions.id),
                    transaction.get(QTransactions.transactions.date),
                    transaction.get(QTransactions.transactions.inBankDate),
                    transaction.get(QTransactions.transactions.amount),
                    transaction.get(QAccounts.accounts.id),
                    transaction.get(QAccounts.accounts.shortName),
                    transaction.get(QAccounts.accounts.color),
                    transaction.get(QCategory.category.id),
                    transaction.get(QSubCategory.subCategory.id),
                    transaction.get(QSubCategory.subCategory.name),
                    transaction.get(QTransactions.transactions.comment),
                    transaction.get(QTransactions.transactions.tag),
                    TransactionSide.valueOf(transaction.get(QTransactions.transactions.side)),
                    transaction.get(QTransactions.transactions.fromToPersonName)
                )
            )
            .toList();
    }
    
    /**
     * Count the total number of transactions in the database
     * 
     * @return The total count of transactions
     */
    public long countTransactions() {
        return this.transactionManager
            .selectQuery()
            .select(QTransactions.transactions.count())
            .from(QTransactions.transactions)
            .fetchFirst();
    }
}
