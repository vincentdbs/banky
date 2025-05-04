package banky.webservices.api.transfert.requests;

import banky.webservices.serializer.ThreeDecimalToStringSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Request object for creating a new transfer between accounts
 */
public record TransfertRequest(
    Long fromAccountId,
    Long toAccountId,
    BigDecimal amount,
    LocalDate date
) {}