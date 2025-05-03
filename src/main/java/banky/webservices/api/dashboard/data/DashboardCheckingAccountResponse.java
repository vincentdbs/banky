package banky.webservices.api.dashboard.data;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.math.BigDecimal;

/**
 * Response object for dashboard checking account data.
 * Contains specific fields needed for checking accounts in the dashboard.
 */
public record DashboardCheckingAccountResponse(
    @JsonSerialize(using = ToStringSerializer.class)
    Long id,
    String name,
    String shortName,
    String colorCode,
    BigDecimal totalAmount,
    BigDecimal inBankAmount
) {
}