package banky.webservices.api.orders.responses;

import banky.services.orders.enums.OrderSide;
import banky.services.orders.enums.TickerCategory;
import banky.webservices.serializer.ThreeDecimalToStringSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Response object for order data including account and ticker information
 */
public record OrderResponse(
    @JsonSerialize(using = ToStringSerializer.class)
    Long id,
    LocalDate date,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal amount,
    Integer quantity,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal charges,
    String accountShortName,
    String accountColor,
    OrderSide side,
    String tickerShortName,
    TickerCategory tickerCategory
) {}