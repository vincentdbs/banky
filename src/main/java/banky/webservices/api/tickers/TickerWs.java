package banky.webservices.api.tickers;

import banky.services.tickers.TickerService;
import banky.webservices.api.tickers.requests.TickerRequest;
import banky.webservices.api.tickers.responses.TickerResponse;
import banky.webservices.data.pagination.PaginatedResponse;
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

/**
 * REST API endpoints for managing tickers
 */
@Path("/tickers")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Tickers", description = "Manage financial tickers")
@PublicApi
@Singleton
public class TickerWs {

    private final TickerService tickerService;
    private static final int DEFAULT_PAGE_SIZE = 20;
    private static final int DEFAULT_PAGE = 1;

    @Inject
    private TickerWs(TickerService tickerService) {
        this.tickerService = tickerService;
    }

    @GET
    @Operation(description = "Fetch tickers with pagination")
    public PaginatedResponse<TickerResponse> fetchTickers(
        @QueryParam("page") Integer page,
        @QueryParam("size") Integer size
    ) {
        int pageSize = size != null ? size : DEFAULT_PAGE_SIZE;
        int pageNumber = page != null ? page : DEFAULT_PAGE;
        
        return tickerService.fetchPaginatedTickers(pageNumber, pageSize);
    }

    @POST
    @Operation(description = "Create a new ticker")
    public long createTicker(TickerRequest request) {
        Validators.checkRequired("name", request.name());
        Validators.checkRequired("shortName", request.shortName());
        Validators.checkRequired("category", request.category());
        
        return tickerService.createTicker(request);
    }
}