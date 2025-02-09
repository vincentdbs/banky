package banky.db.dao;

import banky.db.generated.Accounts;
import banky.db.generated.QAccounts;
import banky.services.accounts.enums.AccountType;
import banky.webservices.api.accounts.data.AccountNamesResponse;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import com.querydsl.core.types.dsl.Expressions;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;

@Singleton
public class AccountDao extends CrudDaoQuerydsl<Accounts> {
    @Inject
    private AccountDao(TransactionManagerQuerydsl transactionManagerQuerydsl) {
        super(transactionManagerQuerydsl, QAccounts.accounts);
    }

    public List<AccountNamesResponse> fetchAccountNames(AccountType type) {
        var predicate = Expressions.asBoolean(true).isTrue();
        if (type != null) {
            predicate = QAccounts.accounts.type.eq(type.name());
        }
        return transactionManager
            .selectQuery()
            .select(QAccounts.accounts.id, QAccounts.accounts.name)
            .from(QAccounts.accounts)
            .where(predicate)
            .fetch()
            .stream()
            .map(
                tuple -> new AccountNamesResponse(
                    tuple.get(QAccounts.accounts.id),
                    tuple.get(QAccounts.accounts.name)
                )
            )
            .toList();
    }
}
