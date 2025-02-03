package banky.webservices.api.accounts;

import banky.services.accounts.AccountsService;
import banky.webservices.api.accounts.data.AccountResponse;
import banky.webservices.api.accounts.data.AccountsRequest;
import com.coreoz.plume.jersey.errors.Validators;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/accounts")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Accounts", description = "Manage accounts")
@PublicApi
@Singleton
public class AccountsWs {

    private final AccountsService categoryService;

    @Inject
    private AccountsWs(AccountsService categoryService) {
        this.categoryService = categoryService;
    }

    @GET
    @Operation(description = "Fetch all accounts")
    public List<AccountResponse> fetchAccounts() {
        return categoryService.fetchAccounts();
    }

    @POST
    @Operation(description = "Create a new account")
    public long createAccount(AccountsRequest request) {
        Validators.checkRequired("name", request.name());
        Validators.checkRequired("shortName", request.shortName());
        Validators.checkRequired("initialAmount", request.initialAmount());
        Validators.checkRequired("colorCode", request.colorCode());
        Validators.checkRequired("type", request.type());
        return categoryService.createAccount(request);
    }

    @PUT
    @Path("/{id}")
    @Operation(description = "Update an existing category")
    public void updateAccount(@PathParam("id") Long id, AccountsRequest request) {
        Validators.checkRequired("name", request.name());
        Validators.checkRequired("shortName", request.shortName());
        Validators.checkRequired("initialAmount", request.initialAmount());
        Validators.checkRequired("colorCode", request.colorCode());
        Validators.checkRequired("type", request.type());
        categoryService.updateAccount(id, request);
    }
}
