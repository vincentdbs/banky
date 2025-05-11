package banky.webservices.api.evolution.responses;

import banky.services.accounts.enums.AccountType;
import banky.webservices.serializer.ThreeDecimalToStringSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.math.BigDecimal;
import java.util.Map;

/**
 * Represents the total amounts for a month with breakdown by account types
 * Corresponds to the TotalByAccountAndMonth type in the frontend
 */
public record TotalByAccountAndMonthResponse(
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal total,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal gainLoss,
    @JsonSerialize(using = ThreeDecimalToStringSerializer.class)
    BigDecimal gainLossPercentage,
    Map<AccountType, TotalByCategoryResponse> totalByCategory
) {}