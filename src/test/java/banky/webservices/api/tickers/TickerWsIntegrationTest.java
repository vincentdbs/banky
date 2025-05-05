package banky.webservices.api.tickers;

import banky.guice.TestModule;
import banky.services.tickers.enums.TickerCategory;
import banky.webservices.api.tickers.requests.TickerRequest;
import banky.webservices.api.tickers.responses.TickerResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import com.coreoz.test.GuiceTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration tests for TickerWs endpoints
 */
@GuiceTest(TestModule.class)
class TickerWsIntegrationTest {

    @Inject
    private TickerWs tickerWs;
    private final TickerRequest testTickerRequest = new TickerRequest(
        "Test Ticker", "TEST", TickerCategory.CAPITALIZING
    );

    @Test
    void fetchTickers_shouldReturnValidResponse_withDefaultPagination() {
        // Act
        PaginatedResponse<TickerResponse> response = tickerWs.fetchTickers(null, null);

        // Assert
        assertThat(response).isNotNull();
        assertThat(response.content()).isNotNull();
        assertThat(response.pagination()).isNotNull();
        assertThat(response.pagination().currentPage()).isEqualTo(1);
        assertThat(response.pagination().size()).isEqualTo(20);
    }
    
    @Test
    void fetchTickers_shouldReturnValidResponse_withCustomPagination() {
        // Arrange
        Integer page = 2;
        Integer size = 5;
        
        // Act
        PaginatedResponse<TickerResponse> response = tickerWs.fetchTickers(page, size);

        // Assert
        assertThat(response).isNotNull();
        assertThat(response.content()).isNotNull();
        assertThat(response.pagination()).isNotNull();
        assertThat(response.pagination().currentPage()).isEqualTo(page);
        assertThat(response.pagination().size()).isEqualTo(size);
    }

    @Test
    void createTicker_shouldReturnValidId() {
        // Act
        Long tickerId = tickerWs.createTicker(testTickerRequest);

        // Assert  
        assertThat(tickerId).isNotNull();
    }
}