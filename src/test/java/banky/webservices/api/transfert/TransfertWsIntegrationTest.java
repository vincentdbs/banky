package banky.webservices.api.transfert;

import banky.guice.TestModule;
import banky.webservices.api.transfert.requests.CreateTransfertRequest;
import banky.webservices.api.transfert.responses.TransfertResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import com.coreoz.test.GuiceTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration tests for TransfertWs endpoints
 */
@GuiceTest(TestModule.class)
class TransfertWsIntegrationTest {

    @Inject
    private TransfertWs transfertWs;
    private final CreateTransfertRequest testCreateTransfertRequest = new CreateTransfertRequest(
        1L, 2L, new BigDecimal("100.00"), LocalDate.of(2025, 1, 15)
    );

    @Test
    void fetchTransferts_shouldReturnValidResponse_withDefaultPagination() {
        // Act
        PaginatedResponse<TransfertResponse> response = transfertWs.fetchTransferts(null, null);

        // Assert
        assertThat(response).isNotNull();
        assertThat(response.content()).isNotNull();
        assertThat(response.pagination()).isNotNull();
        assertThat(response.pagination().currentPage()).isEqualTo(1);
        assertThat(response.pagination().size()).isEqualTo(20);
    }
    
    @Test
    void fetchTransferts_shouldReturnValidResponse_withCustomPagination() {
        // Arrange
        Integer page = 2;
        Integer size = 5;
        
        // Act
        PaginatedResponse<TransfertResponse> response = transfertWs.fetchTransferts(page, size);

        // Assert
        assertThat(response).isNotNull();
        assertThat(response.content()).isNotNull();
        assertThat(response.pagination()).isNotNull();
        assertThat(response.pagination().currentPage()).isEqualTo(page);
        assertThat(response.pagination().size()).isEqualTo(size);
    }

    @Test
    void createTransfert_shouldReturnValidId() {
        // Act
        Long transfertId = transfertWs.createTransfert(testCreateTransfertRequest);

        // Assert  
        assertThat(transfertId).isNotNull();
    }
}