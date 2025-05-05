package banky.services.accounts;

import banky.db.dao.AccountDao;
import banky.db.generated.Accounts;
import banky.services.accounts.enums.AccountType;
import banky.webservices.api.accounts.data.AccountNamesResponse;
import banky.webservices.api.accounts.data.AccountResponse;
import banky.webservices.api.accounts.data.AccountRequest;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;

@Singleton
public class AccountsService {

    private final AccountDao accountDao;

    @Inject
    private AccountsService(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    public List<AccountResponse> fetchAccounts() {
        return accountDao
            .findAll()
            .stream()
            .map(
                account -> new AccountResponse(
                    account.getId(),
                    account.getName(),
                    account.getShortName(),
                    account.getInitialAmount(),
                    account.getColor(),
                    AccountType.valueOf(account.getType())
                )
            )
            .toList();
    }

    public List<AccountNamesResponse> fetchAccountNames(AccountType type) {
        return accountDao.fetchAccountNames(type);
    }

    public Long createAccount(AccountRequest request) {
        Accounts account = new Accounts();
        account.setName(request.name().trim());
        account.setShortName(request.shortName().trim());
        account.setInitialAmount(request.initialAmount());
        account.setColor(request.colorCode().trim());
        account.setType(request.type());
        return accountDao.save(account).getId();
    }

    public void updateAccount(Long id, AccountRequest request) {
        Accounts account = new Accounts();
        account.setName(request.name().trim());
        account.setShortName(request.shortName().trim());
        account.setInitialAmount(request.initialAmount());
        account.setColor(request.colorCode());
        account.setType(request.type());
        account.setId(id);
        accountDao.save(account);
    }

    /**
     * Checks if an account has the given type
     * @param accountId the ID of the account to check
     * @param type the required account type
     * @return true if the account exists and has the specified type, false otherwise
     */
    public boolean isAccountOfType(Long accountId, AccountType type) {
        return accountDao.isAccountOfType(accountId, type);
    }
}
