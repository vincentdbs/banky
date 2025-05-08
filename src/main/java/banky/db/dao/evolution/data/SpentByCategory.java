package banky.db.dao.evolution.data;

import java.math.BigDecimal;

public record SpentByCategory(
    String name,
    BigDecimal spent,
    BigDecimal budgeted
) {
}
