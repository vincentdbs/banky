package banky.webservices.api.transfert;

import banky.db.generated.Transfert;
import banky.services.transfert.TransfertService;
import banky.webservices.api.transfert.requests.CreateTransfertRequest;
import banky.webservices.api.transfert.responses.TransfertResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import banky.webservices.validators.TransfertsValidator;
import com.coreoz.plume.jersey.errors.Validators;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

/**
 * REST API endpoints for managing transfers between accounts
 */
@Path("/transferts")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Transferts", description = "Manage transfers between accounts")
@PublicApi
@Singleton
public class TransfertWs {
    private static final int DEFAULT_PAGE_SIZE = 20;
    private static final int DEFAULT_PAGE = 1;

    private final TransfertService transfertService;
    private final TransfertsValidator transfertsValidator;

    @Inject
    private TransfertWs(TransfertService transfertService, TransfertsValidator transfertsValidator) {
        this.transfertService = transfertService;
        this.transfertsValidator = transfertsValidator;
    }

    @GET
    @Operation(description = "Fetch transfers between accounts with pagination")
    public PaginatedResponse<TransfertResponse> fetchTransferts(
        @QueryParam("page") Integer page,
        @QueryParam("size") Integer size
    ) {
        int pageSize = size != null ? size : DEFAULT_PAGE_SIZE;
        int pageNumber = page != null ? page : DEFAULT_PAGE;
        
        return transfertService.fetchPaginatedTransferts(pageNumber, pageSize);
    }

    @POST
    @Operation(description = "Create a new transfer between accounts")
    public long createTransfert(CreateTransfertRequest request) {
        Validators.checkRequired("fromAccountId", request.fromAccountId());
        Validators.checkRequired("toAccountId", request.toAccountId());
        Validators.checkRequired("amount", request.amount());
        Validators.checkRequired("date", request.date());
        
        return transfertService.createTransfert(request);
    }
    
    @DELETE
    @Path("/{transfertId}")
    @Operation(description = "Delete a transfer by its ID")
    public void deleteTransfert(@PathParam("transfertId") long transfertId) {
        transfertsValidator.checkTransfertExists(transfertId);

        transfertService.deleteTransfert(transfertId);
    }
    
    @PUT
    @Path("/{id}")
    @Operation(description = "Update an existing transfert")
    public void updateTransfert(
        @PathParam("id") long id,
        CreateTransfertRequest request
    ) {
        // Validate that the transfert exists before proceeding
        Transfert transfert = transfertsValidator.checkTransfertExists(id);

        // Validate required fields
        Validators.checkRequired("date", request.date());
        Validators.checkRequired("amount", request.amount());
        Validators.checkRequired("fromAccountId", request.fromAccountId());
        Validators.checkRequired("toAccountId", request.toAccountId());

        transfertService.updateTransfert(transfert, request);
    }
}