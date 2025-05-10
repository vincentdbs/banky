package banky.webservices.api.tickers.responses;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

/**
 * Simplified ticker response containing only the ID and name for dropdown lists
 */
public record TickerNameResponse(
    @JsonSerialize(using = ToStringSerializer.class)
    Long id,
    String shortName
) {
}