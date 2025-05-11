package banky.webservices.api.evolution;

import banky.services.evolution.TreasuryService;
import banky.webservices.api.evolution.responses.AnnualTotalResponse;
import banky.webservices.exceptions.BankyWsError;
import banky.services.evolution.MonthlyBudgetService;
import banky.services.evolution.data.MonthlyBudgetType;
import banky.webservices.api.evolution.responses.MonthlyBudgetResponse;
import com.coreoz.plume.jersey.errors.Validators;
import com.coreoz.plume.jersey.errors.WsException;
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

import java.time.LocalDate;

/**
 * Web service providing API endpoints to retrieve treasury evolution data.
 * Exposes endpoints for analyzing account value changes over time periods.
 */
@Path("/evolutions")
@Tag(name = "evolution", description = "Retrieve treasury evolution data")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Tag(name = "Evolutions", description = "Access financial evolution data")
@PublicApi
@Singleton
public class EvolutionWs {

    private final TreasuryService treasuryService;
    private final MonthlyBudgetService monthlyBudgetService;

    @Inject
    private EvolutionWs(
        TreasuryService treasuryService,
        MonthlyBudgetService monthlyBudgetService
    ) {
        this.treasuryService = treasuryService;
        this.monthlyBudgetService = monthlyBudgetService;
    }

    /**
     * Retrieves treasury evolution totals for a specified date range.
     *
     * @param startDate      The first month to include in the results (day is ignored)
     * @param numberOfMonths The number of months to fetch from the start date
     * @return AnnualTotalResponse containing monthly totals and account breakdowns
     */
    @GET
    @Path("/treasury")
    @Operation(description = "Retrieve treasury evolution totals for a specified date range")
    public AnnualTotalResponse fetchEvolutionTotals(
        @Parameter(description = "Start date (first month to include, day is ignored)", required = true)
        @QueryParam("startDate") LocalDate startDate,
        @Parameter(description = "Number of months to fetch from the start date", required = true)
        @QueryParam("numberOfMonths") Integer numberOfMonths
    ) {

        // Validate parameters
        Validators.checkRequired("startDate", startDate);
        Validators.checkRequired("numberOfMonths", numberOfMonths);

        // Validate number of months
        if (numberOfMonths <= 0) {
            throw new WsException(BankyWsError.INVALID_NUMBER_OF_MONTHS);
        }

        // Fetch and return evolution totals
        return treasuryService.fetchEvolutionTotals(startDate, numberOfMonths);
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