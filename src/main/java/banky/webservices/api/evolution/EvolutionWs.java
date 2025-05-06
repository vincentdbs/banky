package banky.webservices.api.evolution;

import banky.services.evolution.EvolutionService;
import banky.webservices.api.evolution.responses.MonthlyBudgetResponse;
import com.coreoz.plume.jersey.security.permission.PublicApi;
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
 * REST API endpoints for evolution features, including monthly budget data.
 * Exposes data that shows the evolution of financial information over time.
 */
@Path("/evolutions")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Evolutions", description = "Access financial evolution data")
@PublicApi
@Singleton
public class EvolutionWs {

    private final EvolutionService evolutionService;

    @Inject
    private EvolutionWs(EvolutionService evolutionService) {
        this.evolutionService = evolutionService;
    }

    /**
     * Fetches the monthly budget data including categories, totals, and balances.
     * 
     * @return A MonthlyBudgetResponse containing the monthly budget data
     */
    @GET
    @Path("/budgets/monthly")
    @Operation(description = "Fetch the monthly budget data")
    public MonthlyBudgetResponse fetchMonthlyBudget() {
        return evolutionService.fetchMonthlyBudget();
    }
}