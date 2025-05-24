package banky.webservices.api.transactions;

import banky.db.generated.Transactions;
import banky.services.transactions.TransactionsService;
import banky.webservices.api.transactions.requests.CreateTransactionRequest;
import banky.webservices.api.transactions.responses.TransactionResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import banky.webservices.validators.TransactionValidator;
import com.coreoz.plume.jersey.errors.Validators;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import static banky.webservices.data.pagination.PaginationHelper.DEFAULT_PAGE;
import static banky.webservices.data.pagination.PaginationHelper.DEFAULT_PAGE_SIZE;

@Path("/transactions")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Transactions", description = "Manage transactions")
@PublicApi
@Singleton
public class TransactionsWs {

    private final TransactionsService transactionsService;
    private final TransactionValidator transactionValidator;

    @Inject
    private TransactionsWs(TransactionsService transactionsService, TransactionValidator transactionValidator) {
        this.transactionsService = transactionsService;
        this.transactionValidator = transactionValidator;
    }

    @GET
    @Operation(description = "Fetch transactions with pagination")
    public PaginatedResponse<TransactionResponse> fetchTransactions(
        @QueryParam("page") Integer page,
        @QueryParam("size") Integer size
    ) {
        int pageSize = size != null ? size : DEFAULT_PAGE_SIZE;
        int pageNumber = page != null ? page : DEFAULT_PAGE;

        return transactionsService.fetchTransactions(pageNumber, pageSize);
    }

    @POST
    @Operation(description = "Create a new transaction")
    public long createTransaction(CreateTransactionRequest request) {
        Validators.checkRequired("date", request.date());
        Validators.checkRequired("amount", request.amount());
        Validators.checkRequired("accountId", request.accountId());
        Validators.checkRequired("fromToPersonName", request.fromToPersonName());
        Validators.checkRequired("subCategoryId", request.subCategoryId());
        Validators.checkRequired("side", request.side());
        return transactionsService.createTransaction(request);
    }

    @PUT
    @Path("/{id}")
    @Operation(description = "Update an existing transaction")
    public Response updateTransaction(
        @PathParam("id") long id,
        CreateTransactionRequest request
    ) {
        // Validate that the transaction exists before proceeding
        Transactions transaction = transactionValidator.checkTransactionExists(id);

        // Validate required fields
        Validators.checkRequired("date", request.date());
        Validators.checkRequired("amount", request.amount());
        Validators.checkRequired("accountId", request.accountId());
        Validators.checkRequired("fromToPersonName", request.fromToPersonName());
        Validators.checkRequired("subCategoryId", request.subCategoryId());
        Validators.checkRequired("side", request.side());

        transactionsService.updateTransaction(transaction, request);
        return Response.noContent().build();
    }

    @DELETE
    @Path("/{id}")
    @Operation(description = "Delete a transaction")
    public Response deleteTransaction(@PathParam("id") long id) {
        transactionValidator.checkTransactionExists(id);

        transactionsService.deleteTransaction(id);
        return Response.noContent().build();
    }
}
