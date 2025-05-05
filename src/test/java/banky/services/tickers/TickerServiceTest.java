package banky.services.tickers;

import banky.db.dao.TickerDao;
import banky.db.generated.Ticker;
import banky.services.tickers.enums.TickerCategory;
import banky.webservices.api.tickers.requests.TickerRequest;
import banky.webservices.api.tickers.responses.TickerResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

/**
 * Unit tests for TickerService class
 */
@ExtendWith(MockitoExtension.class)
class TickerServiceTest {

    @Mock
    private TickerDao tickerDao;

    @InjectMocks
    private TickerService tickerService;

    @Test
    void fetchPaginatedTickers_shouldReturnPaginatedResponse() {
        // Arrange
        List<TickerResponse> expectedTickers = List.of(
            new TickerResponse(
                1L,
                "LVMH Moët Hennessy",
                "LVMH",
                TickerCategory.CAPITALIZING
            )
        );
        when(tickerDao.countTickers()).thenReturn(1L);
        when(tickerDao.fetchTickersPaginated(anyInt(), anyInt())).thenReturn(expectedTickers);

        // Act
        PaginatedResponse<TickerResponse> paginatedResponse = tickerService.fetchPaginatedTickers(1, 20);

        // Assert
        assertThat(paginatedResponse.content()).isEqualTo(expectedTickers);
        assertThat(paginatedResponse.pagination().currentPage()).isEqualTo(1);
        assertThat(paginatedResponse.pagination().totalPages()).isEqualTo(1);
        assertThat(paginatedResponse.pagination().totalElements()).isEqualTo(1);
        assertThat(paginatedResponse.pagination().size()).isEqualTo(20);
    }

    @Test
    void createTicker_shouldSaveTickerAndReturnId() {
        // Arrange
        TickerRequest request = new TickerRequest(
            "Test Ticker", "TEST", TickerCategory.CAPITALIZING
        );

        Ticker savedTicker = new Ticker();
        savedTicker.setId(1L);
        when(tickerDao.save(any(Ticker.class))).thenReturn(savedTicker);

        // Act
        Long tickerId = tickerService.createTicker(request);

        // Assert
        assertThat(tickerId).isEqualTo(1L);
    }
}