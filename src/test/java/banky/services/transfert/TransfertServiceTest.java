package banky.services.transfert;

import banky.db.dao.TransfertDao;
import banky.db.generated.Transfert;
import banky.guice.TestModule;
import banky.webservices.api.transfert.requests.TransfertRequest;
import banky.webservices.api.transfert.responses.TransfertResponse;
import com.coreoz.test.GuiceTest;
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
    void fetchTransferts_shouldReturnListFromDao() {
        // Arrange
        List<TransfertResponse> expectedTransferts = List.of(
            new TransfertResponse(1L, 10L, "Checking", 20L, "Savings",
                new BigDecimal("100.00"), LocalDate.of(2025, 5, 1))
        );
        when(transfertDao.fetchTransferts()).thenReturn(expectedTransferts);

        // Act
        List<TransfertResponse> actualTransferts = transfertService.fetchTransferts();

        // Assert
        assertThat(actualTransferts).isEqualTo(expectedTransferts);
    }

    @Test
    void createTransfert_shouldSaveTransfertAndReturnId() {
        // Arrange
        TransfertRequest request = new TransfertRequest(
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