package banky.db.dao;

import banky.db.generated.QAccounts;
import banky.db.generated.QTransfert;
import banky.db.generated.Transfert;
import banky.webservices.api.transfert.responses.TransfertResponse;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

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
     * Fetches all transfers with account details
     *
     * @return List of transfers with source and destination account information
     */
    public List<TransfertResponse> fetchTransferts() {
        QAccounts fromAccount = new QAccounts("from_account");
        QAccounts toAccount = new QAccounts("to_account");

        return this.transactionManager
            .selectQuery()
            .select(
                QTransfert.transfert.id,
                QTransfert.transfert.fromAccountId,
                fromAccount.name,
                QTransfert.transfert.toAccountId,
                toAccount.name,
                QTransfert.transfert.amount,
                QTransfert.transfert.date
            )
            .from(QTransfert.transfert)
            .innerJoin(fromAccount)
            .on(QTransfert.transfert.fromAccountId.eq(fromAccount.id))
            .innerJoin(toAccount)
            .on(QTransfert.transfert.toAccountId.eq(toAccount.id))
            .orderBy(QTransfert.transfert.date.desc())
            .fetch()
            .stream()
            .map(
                transfert -> new TransfertResponse(
                    transfert.get(QTransfert.transfert.id),
                    transfert.get(QTransfert.transfert.fromAccountId),
                    transfert.get(fromAccount.name),
                    transfert.get(QTransfert.transfert.toAccountId),
                    transfert.get(toAccount.name),
                    transfert.get(QTransfert.transfert.amount),
                    transfert.get(QTransfert.transfert.date)
                )
            )
            .toList();
    }
}