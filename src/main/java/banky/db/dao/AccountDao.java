package banky.db.dao;

import banky.db.generated.Accounts;
import banky.db.generated.QAccounts;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

@Singleton
public class AccountDao extends CrudDaoQuerydsl<Accounts> {
    @Inject
    private AccountDao(TransactionManagerQuerydsl transactionManagerQuerydsl) {
        super(transactionManagerQuerydsl, QAccounts.accounts);
    }
}
