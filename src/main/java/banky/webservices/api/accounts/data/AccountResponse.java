package banky.webservices.api.accounts.data;

import banky.services.accounts.enums.AccountType;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.math.BigDecimal;

public record AccountResponse(
    @JsonSerialize(using = ToStringSerializer.class)
    Long id,
    String name,
    String shortName,
    BigDecimal initialAmount,
    String colorCode,
    AccountType type
) {
}
