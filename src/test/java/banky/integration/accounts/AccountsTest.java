package banky.integration.accounts;

import banky.guice.TestModule;
import banky.services.accounts.AccountsService;
import banky.services.accounts.enums.AccountType;
import com.coreoz.test.GuiceTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Integration tests for Accounts functionality
 */
@GuiceTest(TestModule.class)
public class AccountsTest {
    @Inject
    private AccountsService accountsService;

    private static final int TOTAL_ACCOUNTS = 12;
    private static final int SAVINGS_ACCOUNTS = 3;
    private static final int CHECKING_ACCOUNTS = 5;
    private static final int MARKET_ACCOUNTS = 4;

    @Test
    public void fetchAccounts__all_result() {
        assertEquals(TOTAL_ACCOUNTS, accountsService.fetchAccounts().size());
    }

    @Test
    public void fetchAccountsNames__no_filters() {
        assertEquals(TOTAL_ACCOUNTS, accountsService.fetchAccountNames(null).size());
    }

    @Test
    public void fetchAccountsNames__empty_list_filters() {
        assertEquals(TOTAL_ACCOUNTS, accountsService.fetchAccountNames(Collections.emptyList()).size());
    }

    // Single type filter tests
    @Test
    public void fetchAccountsNames__type_filter_saving() {
        assertEquals(SAVINGS_ACCOUNTS, accountsService.fetchAccountNames(List.of(AccountType.SAVINGS)).size());
    }

    @Test
    public void fetchAccountsNames__type_filter_checking() {
        assertEquals(CHECKING_ACCOUNTS, accountsService.fetchAccountNames(List.of(AccountType.CHECKING)).size());
    }

    @Test
    public void fetchAccountsNames__type_filter_market() {
        assertEquals(MARKET_ACCOUNTS, accountsService.fetchAccountNames(List.of(AccountType.MARKET)).size());
    }

    // Multiple types filter tests
    @Test
    public void fetchAccountsNames__savings_and_checking() {
        assertEquals(SAVINGS_ACCOUNTS + CHECKING_ACCOUNTS, 
            accountsService.fetchAccountNames(List.of(AccountType.SAVINGS, AccountType.CHECKING)).size());
    }

    @Test
    public void fetchAccountsNames__savings_and_market() {
        assertEquals(SAVINGS_ACCOUNTS + MARKET_ACCOUNTS, 
            accountsService.fetchAccountNames(List.of(AccountType.SAVINGS, AccountType.MARKET)).size());
    }

    @Test
    public void fetchAccountsNames__checking_and_market() {
        assertEquals(CHECKING_ACCOUNTS + MARKET_ACCOUNTS, 
            accountsService.fetchAccountNames(List.of(AccountType.CHECKING, AccountType.MARKET)).size());
    }

    @Test
    public void fetchAccountsNames__all_types() {
        assertEquals(TOTAL_ACCOUNTS, 
            accountsService.fetchAccountNames(List.of(AccountType.SAVINGS, AccountType.CHECKING, AccountType.MARKET)).size());
    }
}
