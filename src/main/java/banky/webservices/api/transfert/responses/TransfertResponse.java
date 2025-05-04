package banky.webservices.api.transfert.responses;

import banky.webservices.serializer.ThreeDecimalToStringSerializer;
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
    String fromAccountColor,
    Long toAccountId,
    String toAccountName,
    String toAccountColor,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal amount,
    LocalDate date
) {}