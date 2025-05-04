package banky.webservices.api.transfert;

import banky.services.transfert.TransfertService;
import banky.webservices.api.transfert.requests.TransfertRequest;
import banky.webservices.api.transfert.responses.TransfertResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import banky.webservices.data.pagination.PaginationMeta;
import com.coreoz.plume.jersey.errors.WsException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

/**
 * Unit tests for TransfertWs class
 */
@ExtendWith(MockitoExtension.class)
class TransfertWsTest {

    @Mock
    private TransfertService transfertService;

    @InjectMocks
    private TransfertWs transfertWs;

    @Test
    void fetchTransferts_shouldReturnPaginatedTransferts_withDefaultPagination() {
        // Arrange
        List<TransfertResponse> expectedTransferts = List.of(
            new TransfertResponse(
                1L,
                10L,
                "Checking",
                "FFFFFF",
                20L,
                "Savings",
                "000000",
                new BigDecimal("100.00"),
                LocalDate.of(2025, 5, 1))
        );
        PaginationMeta paginationMeta = new PaginationMeta(1, 1, 1, 20);
        PaginatedResponse<TransfertResponse> expectedResponse = 
            new PaginatedResponse<>(expectedTransferts, paginationMeta);
            
        when(transfertService.fetchPaginatedTransferts(1, 20)).thenReturn(expectedResponse);

        // Act
        PaginatedResponse<TransfertResponse> actualResponse = transfertWs.fetchTransferts(null, null);

        // Assert
        assertThat(actualResponse).isEqualTo(expectedResponse);
        assertThat(actualResponse.content()).isEqualTo(expectedTransferts);
        assertThat(actualResponse.pagination().currentPage()).isEqualTo(1);
        assertThat(actualResponse.pagination().size()).isEqualTo(20);
    }
    
    @Test
    void fetchTransferts_shouldReturnPaginatedTransferts_withCustomPagination() {
        // Arrange
        List<TransfertResponse> expectedTransferts = List.of(
            new TransfertResponse(
                1L,
                10L,
                "Checking",
                "FFFFFF",
                20L,
                "Savings",
                "000000",
                new BigDecimal("100.00"),
                LocalDate.of(2025, 5, 1))
        );
        PaginationMeta paginationMeta = new PaginationMeta(2, 5, 42, 10);
        PaginatedResponse<TransfertResponse> expectedResponse = 
            new PaginatedResponse<>(expectedTransferts, paginationMeta);
            
        when(transfertService.fetchPaginatedTransferts(2, 10)).thenReturn(expectedResponse);

        // Act
        PaginatedResponse<TransfertResponse> actualResponse = transfertWs.fetchTransferts(2, 10);

        // Assert
        assertThat(actualResponse).isEqualTo(expectedResponse);
        assertThat(actualResponse.content()).isEqualTo(expectedTransferts);
        assertThat(actualResponse.pagination().currentPage()).isEqualTo(2);
        assertThat(actualResponse.pagination().size()).isEqualTo(10);
    }

    @Test
    void createTransfert_shouldReturnNewId_whenRequestIsValid() {
        // Arrange
        TransfertRequest request = new TransfertRequest(
            10L,
            20L,
            new BigDecimal("100.00"),
            LocalDate.of(2025, 5, 1)
        );
        when(transfertService.createTransfert(request)).thenReturn(1L);

        // Act
        long id = transfertWs.createTransfert(request);

        // Assert
        assertThat(id).isEqualTo(1L);
    }

    @Test
    void createTransfert_shouldThrowException_whenFromAccountIdIsMissing() {
        // Arrange
        TransfertRequest request = new TransfertRequest(
            null, 20L, new BigDecimal("100.00"), LocalDate.of(2025, 5, 1)
        );

        // Act & Assert
        assertThatThrownBy(() -> transfertWs.createTransfert(request))
            .isInstanceOf(WsException.class);
    }

    @Test
    void createTransfert_shouldThrowException_whenToAccountIdIsMissing() {
        // Arrange
        TransfertRequest request = new TransfertRequest(
            10L, null, new BigDecimal("100.00"), LocalDate.of(2025, 5, 1)
        );

        // Act & Assert
        assertThatThrownBy(() -> transfertWs.createTransfert(request))
            .isInstanceOf(WsException.class);
    }

    @Test
    void createTransfert_shouldThrowException_whenAmountIsMissing() {
        // Arrange
        TransfertRequest request = new TransfertRequest(
            10L, 20L, null, LocalDate.of(2025, 5, 1)
        );

        // Act & Assert
        assertThatThrownBy(() -> transfertWs.createTransfert(request))
            .isInstanceOf(WsException.class);
    }

    @Test
    void createTransfert_shouldThrowException_whenDateIsMissing() {
        // Arrange
        TransfertRequest request = new TransfertRequest(
            10L, 20L, new BigDecimal("100.00"), null
        );

        // Act & Assert
        assertThatThrownBy(() -> transfertWs.createTransfert(request))
            .isInstanceOf(WsException.class);
    }
}