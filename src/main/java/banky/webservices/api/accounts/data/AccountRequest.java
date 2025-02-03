package banky.webservices.api.accounts.data;

import java.math.BigDecimal;

public record AccountRequest(
    String name,
    String shortName,
    String colorCode,
    BigDecimal initialAmount,
    String type
) {
}
