package banky.webservices.validators;

import banky.services.accounts.AccountsService;
import banky.services.accounts.enums.AccountType;
import banky.webservices.exceptions.BankyWsError;
import com.coreoz.plume.jersey.errors.WsException;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

/**
 * Validator for account-related checks
 */
@Singleton
public class AccountValidator {

    private final AccountsService accountsService;

    @Inject
    public AccountValidator(AccountsService accountsService) {
        this.accountsService = accountsService;
    }

    /**
     * Validates that the account exists and is of the specified type
     * @param accountId The account ID to check
     * @param requiredType The required account type
     * @throws WsException if the account doesn't exist or is not of the required type
     */
    public void validateAccountType(Long accountId, AccountType requiredType) {
        if (!accountsService.isAccountOfType(accountId, requiredType)) {
            throw new WsException(BankyWsError.INVALID_ACCOUNT_TYPE);
        }
    }
}