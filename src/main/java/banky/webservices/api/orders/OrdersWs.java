package banky.webservices.api.orders;

import banky.services.accounts.enums.AccountType;
import banky.services.orders.OrdersService;
import banky.webservices.api.orders.requests.OrderRequest;
import banky.webservices.api.orders.responses.OrderResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import banky.webservices.validators.AccountValidator;
import banky.webservices.validators.AmountValidator;
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

import static banky.webservices.data.pagination.PaginationHelper.DEFAULT_PAGE;
import static banky.webservices.data.pagination.PaginationHelper.DEFAULT_PAGE_SIZE;

/**
 * REST API endpoints for managing orders
 */
@Path("/orders")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Orders", description = "Manage orders")
@PublicApi
@Singleton
public class OrdersWs {

    private final OrdersService ordersService;
    private final AccountValidator accountValidator;
    private final AmountValidator amountValidator;

    @Inject
    private OrdersWs(
        OrdersService ordersService,
        AccountValidator accountValidator,
        AmountValidator amountValidator
    ) {
        this.ordersService = ordersService;
        this.accountValidator = accountValidator;
        this.amountValidator = amountValidator;
    }

    @GET
    @Operation(description = "Fetch orders with pagination")
    public PaginatedResponse<OrderResponse> fetchOrders(
        @QueryParam("page") Integer page,
        @QueryParam("size") Integer size
    ) {
        int pageSize = size != null ? size : DEFAULT_PAGE_SIZE;
        int pageNumber = page != null ? page : DEFAULT_PAGE;
        
        return ordersService.fetchOrders(pageNumber, pageSize);
    }

    @POST
    @Operation(description = "Create a new order")
    public long createOrder(OrderRequest request) {
        Validators.checkRequired("date", request.date());
        Validators.checkRequired("name", request.name());
        Validators.checkRequired("amount", request.amount());
        Validators.checkRequired("quantity", request.quantity());
        Validators.checkRequired("charges", request.charges());
        Validators.checkRequired("accountId", request.accountId());
        Validators.checkRequired("tickerId", request.tickerId());
        Validators.checkRequired("side", request.side());
        
        // Validate that the account is a MARKET account
        accountValidator.validateAccountType(request.accountId(), AccountType.MARKET);
        
        // Validate that the amount is positive
        amountValidator.validatePositiveAmount(request.amount());
        
        return ordersService.createOrder(request);
    }
}