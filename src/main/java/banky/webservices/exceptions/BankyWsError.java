package banky.webservices.exceptions;

import com.coreoz.plume.jersey.errors.WsError;

public enum BankyWsError implements WsError {
    INVALID_ACCOUNT_TYPE,
    INVALID_AMOUNT
}