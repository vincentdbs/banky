package banky.webservices.api.tickers.responses;

import banky.services.tickers.enums.TickerCategory;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

/**
 * Response object representing ticker data to be sent to clients
 */
public record TickerResponse(
    @JsonSerialize(using = ToStringSerializer.class)
    Long id,
    String name,
    String shortName,
    TickerCategory category
) {
}