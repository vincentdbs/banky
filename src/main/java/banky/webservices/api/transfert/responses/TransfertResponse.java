package banky.webservices.api.transfert.responses;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Response object for transfert data including source and destination account information
 */
public record TransfertResponse(
    @JsonSerialize(using = ToStringSerializer.class)
    Long id,
    Long fromAccountId,
    String fromAccountName,
    Long toAccountId,
    String toAccountName,
    @JsonSerialize(using = ToStringSerializer.class)
    BigDecimal amount,
    LocalDate date
) {}