package banky.db.dao;

import banky.db.generated.QTicker;
import banky.db.generated.Ticker;
import banky.guice.TestModule;
import banky.services.tickers.enums.TickerCategory;
import banky.webservices.api.tickers.responses.TickerResponse;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import com.coreoz.test.GuiceTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration tests for TickerDao using the existing mock data from database migrations
 */
@GuiceTest(TestModule.class)
class TickerDaoTest {

    @Inject
    private TickerDao tickerDao;

    @Inject
    private TransactionManagerQuerydsl transactionManager;

    @Test
    void fetchTickersPaginated_shouldReturnPagedTickersWithDetails() {
        // Act
        List<TickerResponse> tickers = tickerDao.fetchTickersPaginated(1, 10);

        // Assert
        assertThat(tickers).isNotEmpty();
        assertThat(tickers.size()).isLessThanOrEqualTo(10); // Should not exceed page size

        // Verify all tickers have the expected data structure
        for (TickerResponse ticker : tickers) {
            assertThat(ticker.id()).isNotNull();
            assertThat(ticker.name()).isNotNull();
            assertThat(ticker.shortName()).isNotNull();
            assertThat(ticker.category()).isNotNull();
        }

        // Find a specific ticker from the mock data (id: 1)
        Optional<TickerResponse> specificTicker = tickers.stream()
            .filter(t -> t.id() == 1L)
            .findFirst();

        if (specificTicker.isPresent()) {
            TickerResponse ticker = specificTicker.get();
            assertThat(ticker.name()).isEqualTo("LVMH Moët Hennessy");
            assertThat(ticker.shortName()).isEqualTo("LVMH");
            assertThat(ticker.category()).isEqualTo(TickerCategory.CAPITALIZING);
        }
    }

    @Test
    void fetchTickersPaginated_shouldRespectPaginationParameters() {
        // Act - Request first page with 3 items
        List<TickerResponse> firstPage = tickerDao.fetchTickersPaginated(1, 3);
        // Act - Request second page with 3 items
        List<TickerResponse> secondPage = tickerDao.fetchTickersPaginated(2, 3);

        // Assert
        assertThat(firstPage).isNotEmpty();
        assertThat(firstPage.size()).isLessThanOrEqualTo(3); // Should not exceed page size
        
        if (!secondPage.isEmpty()) {
            // If we have enough data for a second page
            assertThat(secondPage.size()).isLessThanOrEqualTo(3);
            // First and second page should contain different items
            assertThat(firstPage.get(0).id()).isNotEqualTo(secondPage.get(0).id());
        }
    }

    @Test
    void countTickers_shouldReturnTotalCount() {
        // Act
        long count = tickerDao.countTickers();

        // Assert
        assertThat(count).isGreaterThanOrEqualTo(7); // There are at least 7 ticker records in the mock data
    }

    @Test
    void save_shouldCreateNewTicker() {
        // Arrange
        String name = "Test Ticker";
        String shortName = "TEST";
        String category = TickerCategory.CAPITALIZING.name();

        Ticker ticker = new Ticker();
        ticker.setName(name);
        ticker.setShortName(shortName);
        ticker.setCategory(category);

        // Act
        Ticker savedTicker = tickerDao.save(ticker);

        // Assert
        assertThat(savedTicker.getId()).isNotNull();

        // Verify the ticker was properly saved by querying it
        Ticker retrievedTicker = transactionManager
            .selectQuery()
            .select(QTicker.ticker)
            .from(QTicker.ticker)
            .where(QTicker.ticker.id.eq(savedTicker.getId()))
            .fetchOne();

        assertThat(retrievedTicker).isNotNull();
        assertThat(retrievedTicker.getName()).isEqualTo(name);
        assertThat(retrievedTicker.getShortName()).isEqualTo(shortName);
        assertThat(retrievedTicker.getCategory()).isEqualTo(category);

        // Clean up test data
        transactionManager
            .delete(QTicker.ticker)
            .where(QTicker.ticker.id.eq(savedTicker.getId()))
            .execute();
    }
}