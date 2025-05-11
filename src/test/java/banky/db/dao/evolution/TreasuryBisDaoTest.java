package banky.db.dao.evolution;

import banky.db.dao.evolution.data.AccountMonthlyEvolution;
import com.coreoz.plume.db.querydsl.transaction.TransactionManagerQuerydsl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class TreasuryBisDaoTest {

    @Mock
    private TransactionManagerQuerydsl transactionManagerQuerydsl;
    
    @Mock
    private DataSource dataSource;
    
    @Mock
    private Connection connection;
    
    @Mock
    private PreparedStatement preparedStatement;
    
    @Mock
    private ResultSet resultSet;
    
    @InjectMocks
    private TreasuryBisDao treasuryBisDao;
    
    @Test
    public void fetchEvolutionTotals_should_return_empty_list_when_startDate_is_null() {
        // when
        List<AccountMonthlyEvolution> result = treasuryBisDao.fetchAccountsTotalsByMonth(null, 3);
        
        // then
        assertThat(result).isEmpty();
    }
    
    @Test
    public void fetchEvolutionTotals_should_return_empty_list_when_numberOfMonths_is_not_positive() {
        // when
        List<AccountMonthlyEvolution> result = treasuryBisDao.fetchAccountsTotalsByMonth(LocalDate.now(), 0);
        
        // then
        assertThat(result).isEmpty();
    }
    
    @Test
    public void fetchEvolutionTotals_should_correctly_map_resultSet_to_accountMonthlyEvolution() throws Exception {
        // given
        LocalDate startDate = LocalDate.of(2025, 1, 1);
        int numberOfMonths = 3;
          when(transactionManagerQuerydsl.dataSource()).thenReturn(dataSource);
        when(dataSource.getConnection()).thenReturn(connection);
        when(connection.prepareCall(anyString())).thenReturn(preparedStatement);
        when(preparedStatement.executeQuery()).thenReturn(resultSet);
        
        // Mock first row
        when(resultSet.next()).thenReturn(true, true, false);
        when(resultSet.getString("account_short_name")).thenReturn("ACCT1", "ACCT2");
        when(resultSet.getString("account_name")).thenReturn("Account 1", "Account 2");
        when(resultSet.getLong("account_id")).thenReturn(1L, 2L);
        when(resultSet.getString("account_type")).thenReturn("CHECKING", "SAVINGS");
        when(resultSet.getDate("month")).thenReturn(
            java.sql.Date.valueOf("2025-01-01"),
            java.sql.Date.valueOf("2025-01-01")
        );
        when(resultSet.getBigDecimal("total_amount")).thenReturn(
            java.math.BigDecimal.valueOf(1000.00),
            java.math.BigDecimal.valueOf(2000.00)
        );
        when(resultSet.getBigDecimal("gain_loss")).thenReturn(
            java.math.BigDecimal.valueOf(100.00),
            java.math.BigDecimal.valueOf(200.00)
        );
        
        // when
        List<AccountMonthlyEvolution> result = treasuryBisDao.fetchAccountsTotalsByMonth(startDate, numberOfMonths);
        
        // then
        assertThat(result).hasSize(2);
        assertThat(result.get(0).accountShortName()).isEqualTo("ACCT1");
        assertThat(result.get(0).accountName()).isEqualTo("Account 1");
        assertThat(result.get(0).accountId()).isEqualTo(1L);
        assertThat(result.get(0).accountType()).isEqualTo("CHECKING");
        assertThat(result.get(0).month()).isEqualTo(LocalDate.of(2025, 1, 1));
        assertThat(result.get(0).totalAmount()).isEqualByComparingTo("1000.00");
        assertThat(result.get(0).gainLoss()).isEqualByComparingTo("100.00");
        
        // Verify that dates were correctly set in prepared statement
        verify(preparedStatement).setDate(1, java.sql.Date.valueOf(startDate));
        verify(preparedStatement).setDate(2, java.sql.Date.valueOf(LocalDate.of(2025, 3, 31)));
    }
}
