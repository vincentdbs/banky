package banky.webservices.api.dashboard;

import banky.services.dashboard.DashboardAccountsService;
import banky.webservices.api.dashboard.data.DashboardAccountsResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

/**
 * Web service providing API endpoints to retrieve dashboard data.
 * Exposes specialized account data for the dashboard UI.
 */
@Path("/dashboard")
@Tag(name = "dashboard", description = "Retrieve dashboard account data")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class DashboardWs {
    
    private final DashboardAccountsService dashboardService;
    
    @Inject
    private DashboardWs(DashboardAccountsService dashboardService) {
        this.dashboardService = dashboardService;
    }
    
    /**
     * Retrieves all account data for the dashboard.
     * Returns data for all account types (checking, savings, market) with their specific attributes.
     * 
     * @return DashboardAccountsResponse containing lists of all account types
     */
    @GET
    @Path("/accounts")
    @Operation(description = "Retrieve all account data for the dashboard")
    public DashboardAccountsResponse getDashboardAccounts() {
        return dashboardService.fetchDashboardAccounts();
    }
}