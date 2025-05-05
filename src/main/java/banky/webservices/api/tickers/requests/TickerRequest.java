package banky.webservices.api.tickers.requests;

import banky.services.tickers.enums.TickerCategory;

/**
 * Request object for creating a new ticker
 */
public record TickerRequest(
    String name,
    String shortName,
    TickerCategory category
) {
}