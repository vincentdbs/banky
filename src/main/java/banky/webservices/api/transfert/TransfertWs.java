package banky.webservices.api.transfert;

import banky.services.transfert.TransfertService;
import banky.webservices.api.transfert.requests.TransfertRequest;
import banky.webservices.api.transfert.responses.TransfertResponse;
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
import jakarta.ws.rs.core.MediaType;

import java.util.List;

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

    private final TransfertService transfertService;

    @Inject
    private TransfertWs(TransfertService transfertService) {
        this.transfertService = transfertService;
    }

    @GET
    @Operation(description = "Fetch all transfers between accounts")
    public List<TransfertResponse> fetchTransferts() {
        return transfertService.fetchTransferts();
    }

    @POST
    @Operation(description = "Create a new transfer between accounts")
    public long createTransfert(TransfertRequest request) {
        Validators.checkRequired("fromAccountId", request.fromAccountId());
        Validators.checkRequired("toAccountId", request.toAccountId());
        Validators.checkRequired("amount", request.amount());
        Validators.checkRequired("date", request.date());
        
        return transfertService.createTransfert(request);
    }
}