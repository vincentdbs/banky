package banky.webservices.api.evolution;

import banky.services.evolution.MonthlyBudgetService;
import banky.services.evolution.data.MonthlyBudgetType;
import banky.webservices.api.evolution.responses.MonthlyBudgetResponse;
import com.coreoz.plume.jersey.errors.Validators;
import com.coreoz.plume.jersey.security.permission.PublicApi;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

import javax.xml.validation.Validator;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

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

    private final MonthlyBudgetService monthlyBudgetService;

    @Inject
    private EvolutionWs(MonthlyBudgetService monthlyBudgetService) {
        this.monthlyBudgetService = monthlyBudgetService;
    }

    /**
     * Fetches the monthly budget data for a specific month.
     * 
     * @param date The first day of the month in format "yyyy-MM-dd"
     * @return A MonthlyBudgetResponse containing the monthly budget data
     */
    @GET
    @Path("/budgets/monthly")
    @Operation(description = "Fetch the monthly budget data for a specific month")
    public MonthlyBudgetResponse fetchMonthlyBudgetByDate(
        @QueryParam("date") LocalDate date,
        @QueryParam("type") MonthlyBudgetType type
    ) {
        Validators.checkRequired("date", date);
        Validators.checkRequired("type", type);

        return monthlyBudgetService.fetchMonthlyBudget(date, type);
    }
}