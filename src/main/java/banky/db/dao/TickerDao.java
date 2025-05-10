package banky.db.dao;

import banky.db.generated.QTicker;
import banky.db.generated.Ticker;
import banky.services.tickers.enums.TickerCategory;
import banky.webservices.api.tickers.responses.TickerNameResponse;
import banky.webservices.api.tickers.responses.TickerResponse;
import com.coreoz.plume.db.querydsl.crud.CrudDaoQuerydsl;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Data Access Object for ticker operations providing methods to interact with the ticker table
 */
@Singleton
public class TickerDao extends CrudDaoQuerydsl<Ticker> {

    @Inject
    private TickerDao(TransactionManagerQuerydsl transactionManagerQuerydsl) {
        super(transactionManagerQuerydsl, QTicker.ticker);
    }

    /**
     * Fetches tickers with pagination support
     * 
     * @param page The page number (1-based)
     * @param size The number of items per page
     * @return A list of tickers for the requested page
     */
    public List<TickerResponse> fetchTickersPaginated(int page, int size) {
        int offset = (page - 1) * size; // Convert to 0-based for database query
        
        return this.transactionManager
            .selectQuery()
            .select(
                QTicker.ticker.id,
                QTicker.ticker.name,
                QTicker.ticker.shortName,
                QTicker.ticker.category
            )
            .from(QTicker.ticker)
            .offset(offset)
            .limit(size)
            .orderBy(QTicker.ticker.name.asc())
            .fetch()
            .stream()
            .map(
                ticker -> new TickerResponse(
                    ticker.get(QTicker.ticker.id),
                    ticker.get(QTicker.ticker.name),
                    ticker.get(QTicker.ticker.shortName),
                    TickerCategory.valueOf(ticker.get(QTicker.ticker.category))
                )
            )
            .toList();
    }
    
    /**
     * Count the total number of tickers in the database
     * 
     * @return The total count of tickers
     */
    public long countTickers() {
        return this.transactionManager
            .selectQuery()
            .select(QTicker.ticker.count())
            .from(QTicker.ticker)
            .fetchOne();
    }

    /**
     * Fetches a simplified list of ticker names and IDs for use in dropdown lists
     *
     * @return List of ticker ID and shortName pairs
     */
    public List<TickerNameResponse> fetchTickerNames() {
        return this.transactionManager
            .selectQuery()
            .select(QTicker.ticker.id, QTicker.ticker.shortName)
            .from(QTicker.ticker)
            .orderBy(QTicker.ticker.shortName.asc())
            .fetch()
            .stream()
            .map(row -> new TickerNameResponse(
                row.get(QTicker.ticker.id),
                row.get(QTicker.ticker.shortName)
            ))
            .collect(Collectors.toList());
    }
}