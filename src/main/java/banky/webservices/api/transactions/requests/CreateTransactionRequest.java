package banky.webservices.api.transactions.requests;

import banky.services.transactions.enums.TransactionSide;
import banky.webservices.serializer.TwoDecimalDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import jakarta.annotation.Nullable;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateTransactionRequest(
    LocalDate date,
    @Nullable LocalDate inBankDate,
    @JsonDeserialize(using = TwoDecimalDeserializer.class)
    BigDecimal amount,
    Long accountId,
    String fromToPersonName,
    Long subCategoryId,
    @Nullable String comment,
    @Nullable String tag,
    TransactionSide side
) {}