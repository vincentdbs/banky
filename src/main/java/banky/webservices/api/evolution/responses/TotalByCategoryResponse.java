package banky.webservices.api.evolution.responses;

import banky.webservices.serializer.TwoDecimalToStringSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.math.BigDecimal;
import java.util.List;

/**
 * Represents the total amounts for a category in the evolution report
 * Corresponds to the TotalByCategory type in the frontend
 */
public record TotalByCategoryResponse(
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal total,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal gainLoss,
    @JsonSerialize(using = TwoDecimalToStringSerializer.class)
    BigDecimal gainLossPercentage,
    List<TotalByAccountResponse> totalByAccount
) {}