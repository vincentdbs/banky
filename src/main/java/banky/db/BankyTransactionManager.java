package banky.db;

import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import lombok.extern.slf4j.Slf4j;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.function.Function;

/**
 * Extended transaction manager that provides methods to call stored procedures.
 * This abstraction simplifies database operations that require stored procedure execution.
 */
@Slf4j
@Singleton
public class BankyTransactionManager extends TransactionManagerQuerydsl {

    @Inject
    public BankyTransactionManager(DataSource dataSource) {
        super(dataSource);
    }

    /**
     * Execute a stored procedure with parameters and transform the result set into a list of objects.
     *
     * @param procedureCall The SQL procedure call string
     * @param paramSetter A function to set parameters on the prepared statement
     * @param resultMapper A function to map each result set row to an object
     * @param <T> The type of objects to return
     * @return A list of objects mapped from the result set
     */
    public <T> List<T> executeStoredProcedure(
            String procedureCall,
            ThrowingConsumer<CallableStatement> paramSetter,
            ThrowingFunction<ResultSet, T> resultMapper) {
        
        try (Connection connection = dataSource().getConnection();
             CallableStatement stmt = connection.prepareCall(procedureCall)) {
            
            // Set parameters on the statement
            paramSetter.accept(stmt);
            
            // Execute and process results
            List<T> results = new ArrayList<>();
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    results.add(resultMapper.apply(rs));
                }
            }
            
            return results;
        } catch (SQLException e) {
            logger.error("Error executing stored procedure: {}", procedureCall, e);
            return Collections.emptyList();
        }
    }

    @FunctionalInterface
    public interface ThrowingConsumer<T> {
        void accept(T t) throws SQLException;
    }

    @FunctionalInterface
    public interface ThrowingFunction<T, R> {
        R apply(T t) throws SQLException;
    }
}
