package banky.webservices.api.dashboard.data;

import banky.webservices.serializer.ThreeDecimalToStringSerializer;
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
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal totalAmount,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal inBankAmount
) {
}