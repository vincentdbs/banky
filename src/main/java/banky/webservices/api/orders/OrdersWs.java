package banky.webservices.api.orders;

import banky.db.generated.Orders;
import banky.services.accounts.enums.AccountType;
import banky.services.orders.OrdersService;
import banky.webservices.api.orders.requests.CreateOrderRequest;
import banky.webservices.api.orders.responses.OrderResponse;
import banky.webservices.data.pagination.PaginatedResponse;
import banky.webservices.validators.AccountValidator;
import banky.webservices.validators.AmountValidator;
import banky.webservices.validators.OrdersValidator;
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
    private final OrdersValidator ordersValidator;

    @Inject
    private OrdersWs(
        OrdersService ordersService,
        AccountValidator accountValidator,
        AmountValidator amountValidator,
        OrdersValidator ordersValidator
    ) {
        this.ordersService = ordersService;
        this.accountValidator = accountValidator;
        this.amountValidator = amountValidator;
        this.ordersValidator = ordersValidator;
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
    public long createOrder(CreateOrderRequest request) {
        Validators.checkRequired("date", request.date());
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

    @PUT
    @Path("/{orderId}")
    @Operation(description = "Update an existing order")
    public void updateOrder(@PathParam("orderId") long orderId, CreateOrderRequest request) {
        // Validate that the order exists
        Orders order = ordersValidator.checkOrderExists(orderId);

        Validators.checkRequired("date", request.date());
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

        ordersService.updateOrder(order, request);
    }

    @DELETE
    @Path("/{orderId}")
    @Operation(description = "Delete an order by its ID")
    public void deleteOrder(@PathParam("orderId") long orderId) {
        // Validate that the order exists
        ordersValidator.checkOrderExists(orderId);
        
        // Delete the order
        ordersService.deleteOrder(orderId);
    }
}