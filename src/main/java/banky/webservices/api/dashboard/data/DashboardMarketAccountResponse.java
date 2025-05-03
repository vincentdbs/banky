package banky.webservices.api.dashboard.data;

import banky.webservices.serializer.ThreeDecimalToStringSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.math.BigDecimal;

/**
 * Response object for dashboard market account data.
 * Contains specific fields needed for market accounts in the dashboard.
 */
public record DashboardMarketAccountResponse(
    @JsonSerialize(using = ToStringSerializer.class)
    Long id,
    String name,
    String shortName,
    String colorCode,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal totalAmount
) {
}