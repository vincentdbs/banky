package banky.webservices.exceptions;

import com.coreoz.plume.jersey.errors.WsError;

/**
 * Contains error definitions for the Banky application.
 * Used to provide consistent error responses across the API.
 */
public enum BankyWsError implements WsError {
    INVALID_ACCOUNT_TYPE,
    INVALID_AMOUNT,
    INVALID_NUMBER_OF_MONTHS;
}