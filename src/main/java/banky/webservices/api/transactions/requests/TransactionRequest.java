package banky.webservices.api.transactions.requests;

import banky.services.transactions.enums.TransactionSide;
import jakarta.annotation.Nullable;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionRequest(
    LocalDate date,
    @Nullable LocalDate inBankDate,
    BigDecimal amount,
    Long accountId,
    String fromToPersonName,
    Long subCategoryId,
    @Nullable String comment,
    @Nullable String tag,
    TransactionSide side
) {}