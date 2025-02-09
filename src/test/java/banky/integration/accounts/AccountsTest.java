package banky.integration.accounts;

import banky.guice.TestModule;
import banky.services.accounts.AccountsService;
import banky.services.accounts.enums.AccountType;
import com.coreoz.test.GuiceTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

@GuiceTest(TestModule.class)
public class AccountsTest {
    @Inject
    private AccountsService accountsService;

    @Test
    public void fetchAccounts__all_result() {
        assertEquals(12, accountsService.fetchAccounts().size());
    }

    @Test
    public void fetchAccountsNames__no_filters() {
        assertEquals(12, accountsService.fetchAccountNames(null).size());
    }

    @Test
    public void fetchAccountsNames__type_filter_saving() {
        assertEquals(3, accountsService.fetchAccountNames(AccountType.SAVINGS).size());
    }

    @Test
    public void fetchAccountsNames__type_filter_checking() {
        assertEquals(5, accountsService.fetchAccountNames(AccountType.CHECKING).size());
    }

    // MARKET
    @Test
    public void fetchAccountsNames__type_filter_market() {
        assertEquals(4, accountsService.fetchAccountNames(AccountType.MARKET).size());
    }
}
