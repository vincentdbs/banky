package banky.webservices.api.evolution.responses;

import banky.webservices.serializer.TwoDecimalDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.math.BigDecimal;

/**
 * Data object that contains total amounts for each account at a specific point in time.
 * Used to represent financial account balances for a specific month.
 */
public record AmountByAccountResponse(
    String accountName,
    @JsonDeserialize(using = TwoDecimalDeserializer.class)
    BigDecimal total
) {
}
