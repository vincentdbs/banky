package banky.webservices.api.dashboard.data;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.math.BigDecimal;

/**
 * Response object for dashboard saving account data.
 * Contains specific fields needed for savings accounts in the dashboard.
 */
public record DashboardSavingAccountResponse(
    @JsonSerialize(using = ToStringSerializer.class)
    Long id,
    String name,
    String shortName,
    String colorCode,
    BigDecimal totalAmount,
    BigDecimal interestAmount
) {
}