package banky.webservices.api.transfert.requests;

import banky.webservices.serializer.TwoDecimalDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Request object for creating a new transfer between accounts
 */
public record CreateTransfertRequest(
    Long fromAccountId,
    Long toAccountId,
    @JsonDeserialize(using = TwoDecimalDeserializer.class)
    BigDecimal amount,
    LocalDate date
) {}