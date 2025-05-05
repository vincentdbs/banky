package banky.webservices.validators;

import banky.webservices.exceptions.BankyWsError;
import com.coreoz.plume.jersey.errors.WsException;
import jakarta.inject.Singleton;

import java.math.BigDecimal;

/**
 * Validator for amount-related checks
 */
@Singleton
public class AmountValidator {

    /**
     * Validates that the amount is greater than zero
     * @param amount The amount to validate
     * @throws WsException if the amount is null or less than or equal to zero
     */
    public void validatePositiveAmount(BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new WsException(BankyWsError.INVALID_AMOUNT);
        }
    }
}