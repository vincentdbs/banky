package banky.services.transfert;

import banky.db.dao.TransfertDao;
import banky.db.generated.Transfert;
import banky.webservices.api.transfert.requests.CreateTransfertRequest;
import banky.webservices.api.transfert.responses.TransfertResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

/**
 * Unit tests for TransfertService class
 */
@ExtendWith(MockitoExtension.class)
class TransfertServiceTest {

    @Mock
    private TransfertDao transfertDao;

    @InjectMocks
    private TransfertService transfertService;

    @Test
    void fetchPaginatedTransferts_shouldReturnPaginatedResponse() {
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
                LocalDate.of(2025, 5, 1)
            )
        );
        when(transfertDao.countTransferts()).thenReturn(1L);
        when(transfertDao.fetchTransfertsPaginated(anyInt(), anyInt())).thenReturn(expectedTransferts);

        // Act
        PaginatedResponse<TransfertResponse> paginatedResponse = transfertService.fetchPaginatedTransferts(1, 20);

        // Assert
        assertThat(paginatedResponse.content()).isEqualTo(expectedTransferts);
        assertThat(paginatedResponse.pagination().currentPage()).isEqualTo(1);
        assertThat(paginatedResponse.pagination().totalPages()).isEqualTo(1);
        assertThat(paginatedResponse.pagination().totalElements()).isEqualTo(1);
        assertThat(paginatedResponse.pagination().size()).isEqualTo(20);
    }

    @Test
    void createTransfert_shouldSaveTransfertAndReturnId() {
        // Arrange
        CreateTransfertRequest request = new CreateTransfertRequest(
            10L, 20L, new BigDecimal("100.00"), LocalDate.of(2025, 5, 1)
        );

        Transfert savedTransfert = new Transfert();
        savedTransfert.setId(1L);
        when(transfertDao.save(any(Transfert.class))).thenReturn(savedTransfert);

        // Act
        Long transfertId = transfertService.createTransfert(request);

        // Assert
        assertThat(transfertId).isEqualTo(1L);
    }
}