package banky.webservices.api.transfert;

import banky.guice.TestModule;
import banky.webservices.api.transfert.requests.TransfertRequest;
import banky.webservices.api.transfert.responses.TransfertResponse;
import com.coreoz.test.GuiceTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Integration tests for TransfertWs endpoints
 */
@GuiceTest(TestModule.class)
class TransfertWsIntegrationTest {

    @Inject
    private TransfertWs transfertWs;
    private final TransfertRequest testTransfertRequest = new TransfertRequest(
        1L, 2L, new BigDecimal("100.00"), LocalDate.of(2025, 1, 15)
    );

    @Test
    void fetchTransferts_shouldReturnValidResponse() {
        // Act
        List<TransfertResponse> response = transfertWs.fetchTransferts();

        // Assert
        assertThat(response).isNotNull();
        assertThat(response).hasSize(8);
    }

    @Test
    void createTransfert_shouldReturnValidId() {
        // Act
        Long transfertId = transfertWs.createTransfert(testTransfertRequest);

        // Assert  
        assertThat(transfertId).isNotNull();
    }
}