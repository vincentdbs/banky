package banky.db.dao.category.data;

import java.math.BigDecimal;

public record SpentByCategory(
    String name,
    BigDecimal spent,
    BigDecimal budgeted
) {
}
