package banky.webservices.api.transactions.responses;

import banky.services.transactions.enums.TransactionSide;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.annotation.Nullable;

import java.math.BigDecimal;
import java.time.LocalDate;

public record TransactionResponse(
    @JsonSerialize(using = ToStringSerializer.class)
    Long id,
    LocalDate date,
    @Nullable LocalDate inBankDate,
    BigDecimal amount,
    @JsonSerialize(using = ToStringSerializer.class)
    Long accountId,
    String accountName,
    String accountColor,
    @JsonSerialize(using = ToStringSerializer.class)
    Long categoryId,
    @JsonSerialize(using = ToStringSerializer.class)
    Long subCategoryId,
    String subCategoryName,
    @Nullable String comment,
    @Nullable String tag,
    TransactionSide side,
    String fromToPersonName
) {}
