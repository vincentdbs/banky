package banky.webservices.api.orders.requests;

import banky.services.orders.enums.OrderSide;
import banky.webservices.serializer.ThreeDecimalDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Request object for creating a new order
 */
public record OrderRequest(
    LocalDate date,
    String name,
    @JsonDeserialize(using = ThreeDecimalDeserializer.class)
    BigDecimal amount,
    Integer quantity,
    @JsonDeserialize(using = ThreeDecimalDeserializer.class)
    BigDecimal charges,
    Long accountId,
    Long tickerId,
    OrderSide side
) {}