package banky.webservices.api.transactions;

import banky.services.transactions.TransactionsService;
import banky.webservices.api.transactions.requests.TransactionRequest;
import banky.webservices.api.transactions.responses.TransactionResponse;
import com.coreoz.plume.jersey.errors.Validators;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/transactions")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Transactions", description = "Manage transactions")
@PublicApi
@Singleton
public class TransactionsWs {

    private final TransactionsService transactionsService;

    @Inject
    private TransactionsWs(TransactionsService transactionsService) {
        this.transactionsService = transactionsService;
    }

    @GET
    @Operation(description = "Fetch all transactions")
    public List<TransactionResponse> fetchTransactions(
        @QueryParam("page") Long page,
        @QueryParam("size") Long size
    ) {
        return transactionsService.fetchTransactions(page, size);
    }

    @POST
    @Operation(description = "Create a new transaction")
    public long createTransaction(TransactionRequest request) {
        Validators.checkRequired("date", request.date());
        Validators.checkRequired("amount", request.amount());
        Validators.checkRequired("accountId", request.accountId());
        Validators.checkRequired("fromToPersonName", request.fromToPersonName());
        Validators.checkRequired("subCategoryId", request.subCategoryId());
        Validators.checkRequired("side", request.side());
        return transactionsService.createTransaction(request);
    }
}
