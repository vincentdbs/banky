package banky.webservices.api.transfert;

import banky.services.transfert.TransfertService;
import banky.webservices.api.transfert.requests.TransfertRequest;
import banky.webservices.api.transfert.responses.TransfertResponse;
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
    void fetchTransferts_shouldReturnTransfertsList() {
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
        when(transfertService.fetchTransferts()).thenReturn(expectedTransferts);

        // Act
        List<TransfertResponse> actualTransferts = transfertWs.fetchTransferts();

        // Assert
        assertThat(actualTransferts).isEqualTo(expectedTransferts);
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