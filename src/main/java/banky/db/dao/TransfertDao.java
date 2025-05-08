package banky.db.dao;

import banky.db.generated.QAccounts;
import banky.db.generated.QTransfert;
import banky.db.generated.Transfert;
import banky.services.accounts.enums.AccountType;
import banky.webservices.api.transfert.responses.TransfertResponse;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import com.querydsl.core.types.dsl.Expressions;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Data Access Object for transfert operations providing methods to interact with the transfert table
 */
@Singleton
public class TransfertDao extends CrudDaoQuerydsl<Transfert> {

    @Inject
    private TransfertDao(TransactionManagerQuerydsl transactionManagerQuerydsl) {
        super(transactionManagerQuerydsl, QTransfert.transfert);
    }

    /**
     * Fetches transfers with pagination support
     * 
     * @param page The page number (1-based)
     * @param size The number of items per page
     * @return A list of transfers for the requested page
     */
    public List<TransfertResponse> fetchTransfertsPaginated(int page, int size) {
        int offset = (page - 1) * size; // Convert to 0-based for database query
        
        QAccounts fromAccount = new QAccounts("from_account");
        QAccounts toAccount = new QAccounts("to_account");

        return this.transactionManager
            .selectQuery()
            .select(
                QTransfert.transfert.id,
                QTransfert.transfert.fromAccountId,
                fromAccount.name,
                fromAccount.color,
                QTransfert.transfert.toAccountId,
                toAccount.name,
                toAccount.color,
                QTransfert.transfert.amount,
                QTransfert.transfert.date
            )
            .from(QTransfert.transfert)
            .innerJoin(fromAccount)
            .on(QTransfert.transfert.fromAccountId.eq(fromAccount.id))
            .innerJoin(toAccount)
            .on(QTransfert.transfert.toAccountId.eq(toAccount.id))
            .offset(offset)
            .limit(size)
            .orderBy(QTransfert.transfert.date.desc())
            .fetch()
            .stream()
            .map(
                transfert -> new TransfertResponse(
                    transfert.get(QTransfert.transfert.id),
                    transfert.get(QTransfert.transfert.fromAccountId),
                    transfert.get(fromAccount.name),
                    transfert.get(fromAccount.color),
                    transfert.get(QTransfert.transfert.toAccountId),
                    transfert.get(toAccount.name),
                    transfert.get(toAccount.color),
                    transfert.get(QTransfert.transfert.amount),
                    transfert.get(QTransfert.transfert.date)
                )
            )
            .toList();
    }
    
    /**
     * Count the total number of transfers in the database
     * 
     * @return The total count of transfers
     */
    public long countTransferts() {
        return this.transactionManager
            .selectQuery()
            .select(QTransfert.transfert.count())
            .from(QTransfert.transfert)
            .fetchOne();
    }

    /**
     * Calculates the total amount transferred to savings accounts (MARKET or SAVINGS type) 
     * during a specific month
     * 
     * @param firstDayOfTheMonth The first day of the month to calculate transfers for
     * @return The total amount transferred to savings accounts during the specified month
     */
    public BigDecimal fetchSavingsAmountByMonth(LocalDate firstDayOfTheMonth) {
        LocalDate lastDayOfTheMonth = firstDayOfTheMonth.plusMonths(1).minusDays(1);
        
        QAccounts toAccount = new QAccounts("to_account");
        
        BigDecimal result = this.transactionManager
            .selectQuery()
            .select(QTransfert.transfert.amount.sum())
            .from(QTransfert.transfert)
            .innerJoin(toAccount)
            .on(QTransfert.transfert.toAccountId.eq(toAccount.id))
            .where(
                QTransfert.transfert.date.between(firstDayOfTheMonth, lastDayOfTheMonth)
                .and(
                    toAccount.type.eq(AccountType.SAVINGS.name())
                    .or(toAccount.type.eq(AccountType.MARKET.name()))
                )
            )
            .fetchOne();
            
        return result != null ? result : BigDecimal.ZERO;
    }
}