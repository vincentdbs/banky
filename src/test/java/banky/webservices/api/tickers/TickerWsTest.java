package banky.webservices.api.tickers;

import banky.services.tickers.TickerService;
import banky.services.tickers.enums.TickerCategory;
import banky.webservices.api.tickers.requests.TickerRequest;
import banky.webservices.api.tickers.responses.TickerResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import banky.webservices.data.pagination.PaginationMeta;
import com.coreoz.plume.jersey.errors.WsException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

/**
 * Unit tests for TickerWs class
 */
@ExtendWith(MockitoExtension.class)
class TickerWsTest {

    @Mock
    private TickerService tickerService;

    @InjectMocks
    private TickerWs tickerWs;

    @Test
    void fetchTickers_shouldReturnPaginatedTickers_withDefaultPagination() {
        // Arrange
        List<TickerResponse> expectedTickers = List.of(
            new TickerResponse(
                1L,
                "LVMH Moët Hennessy",
                "LVMH",
                TickerCategory.CAPITALIZING)
        );
        PaginationMeta paginationMeta = new PaginationMeta(1, 1, 1, 20);
        PaginatedResponse<TickerResponse> expectedResponse = 
            new PaginatedResponse<>(expectedTickers, paginationMeta);
            
        when(tickerService.fetchPaginatedTickers(1, 20)).thenReturn(expectedResponse);

        // Act
        PaginatedResponse<TickerResponse> actualResponse = tickerWs.fetchTickers(null, null);

        // Assert
        assertThat(actualResponse).isEqualTo(expectedResponse);
        assertThat(actualResponse.content()).isEqualTo(expectedTickers);
        assertThat(actualResponse.pagination().currentPage()).isEqualTo(1);
        assertThat(actualResponse.pagination().size()).isEqualTo(20);
    }
    
    @Test
    void fetchTickers_shouldReturnPaginatedTickers_withCustomPagination() {
        // Arrange
        List<TickerResponse> expectedTickers = List.of(
            new TickerResponse(
                1L,
                "LVMH Moët Hennessy",
                "LVMH",
                TickerCategory.CAPITALIZING)
        );
        PaginationMeta paginationMeta = new PaginationMeta(2, 5, 42, 10);
        PaginatedResponse<TickerResponse> expectedResponse = 
            new PaginatedResponse<>(expectedTickers, paginationMeta);
            
        when(tickerService.fetchPaginatedTickers(2, 10)).thenReturn(expectedResponse);

        // Act
        PaginatedResponse<TickerResponse> actualResponse = tickerWs.fetchTickers(2, 10);

        // Assert
        assertThat(actualResponse).isEqualTo(expectedResponse);
        assertThat(actualResponse.content()).isEqualTo(expectedTickers);
        assertThat(actualResponse.pagination().currentPage()).isEqualTo(2);
        assertThat(actualResponse.pagination().size()).isEqualTo(10);
    }

    @Test
    void createTicker_shouldReturnNewId_whenRequestIsValid() {
        // Arrange
        TickerRequest request = new TickerRequest(
            "Test Ticker",
            "TEST",
            TickerCategory.CAPITALIZING
        );
        when(tickerService.createTicker(request)).thenReturn(1L);

        // Act
        long id = tickerWs.createTicker(request);

        // Assert
        assertThat(id).isEqualTo(1L);
    }

    @Test
    void createTicker_shouldThrowException_whenNameIsMissing() {
        // Arrange
        TickerRequest request = new TickerRequest(
            null, "TEST", TickerCategory.CAPITALIZING
        );

        // Act & Assert
        assertThatThrownBy(() -> tickerWs.createTicker(request))
            .isInstanceOf(WsException.class);
    }

    @Test
    void createTicker_shouldThrowException_whenShortNameIsMissing() {
        // Arrange
        TickerRequest request = new TickerRequest(
            "Test Ticker", null, TickerCategory.CAPITALIZING
        );

        // Act & Assert
        assertThatThrownBy(() -> tickerWs.createTicker(request))
            .isInstanceOf(WsException.class);
    }

    @Test
    void createTicker_shouldThrowException_whenCategoryIsMissing() {
        // Arrange
        TickerRequest request = new TickerRequest(
            "Test Ticker", "TEST", null
        );

        // Act & Assert
        assertThatThrownBy(() -> tickerWs.createTicker(request))
            .isInstanceOf(WsException.class);
    }
}