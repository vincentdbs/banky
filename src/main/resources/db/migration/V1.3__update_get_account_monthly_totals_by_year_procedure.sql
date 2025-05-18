-- This stored procedure returns the month, account name, account color, account type, and total amount
-- for each month for number of years before the initial year passed as parameter
DROP PROCEDURE IF EXISTS compute_account_monthly_totals_by_year;

CREATE PROCEDURE compute_account_monthly_totals_by_year(IN initial_year INT, IN number_of_years INT)
BEGIN
    DECLARE start_date DATE;
    DECLARE end_date DATE;

    -- Set the date range for the last year years from the initial year
    SET start_date = CONCAT(initial_year - number_of_years + 1, '-01-01');
    SET end_date = CONCAT(initial_year, '-12-31');

    WITH RECURSIVE
        DateRange AS (
            -- Generate all months in the specified date range (3 years)
            SELECT DATE_FORMAT(start_date, '%Y-%m-01') AS month_date
            UNION ALL
            SELECT DATE_FORMAT(DATE_ADD(month_date, INTERVAL 1 MONTH), '%Y-%m-01')
            FROM DateRange
            WHERE DATE_FORMAT(DATE_ADD(month_date, INTERVAL 1 MONTH), '%Y-%m-01') <=
                  DATE_FORMAT(end_date, '%Y-%m-01')
        ),
        MonthlySnapshots AS (
            -- Generate all possible combinations of months and accounts in date range
            SELECT account.id          AS account_id,
                   account.name        AS account_name,
                   account.short_name  AS account_short_name,
                   account.color       AS account_color,
                   account.type        AS account_type,
                   account.initial_amount,
                   date_range.month_date AS snapshot_month
            FROM bky_accounts account
                     CROSS JOIN DateRange date_range
        ),
        AccountTotals AS (
            SELECT monthly_snapshot.account_id,
                   monthly_snapshot.account_name,
                   monthly_snapshot.account_short_name,
                   monthly_snapshot.account_color,
                   monthly_snapshot.account_type,
                   monthly_snapshot.snapshot_month,
                   YEAR(monthly_snapshot.snapshot_month) AS year,
                   MONTH(monthly_snapshot.snapshot_month) AS month_number,
                   DATE_FORMAT(monthly_snapshot.snapshot_month, '%b') AS month_short_name,
                   monthly_snapshot.initial_amount +
                       -- Add credit transactions
                   COALESCE((SELECT SUM(amount)
                             FROM bky_transactions
                             WHERE account_id = monthly_snapshot.account_id
                               AND side = 'CREDIT'
                               AND date <= LAST_DAY(monthly_snapshot.snapshot_month)), 0) -
                       -- Subtract debit transactions
                   COALESCE((SELECT SUM(amount)
                             FROM bky_transactions
                             WHERE account_id = monthly_snapshot.account_id
                               AND side = 'DEBIT'
                               AND date <= LAST_DAY(monthly_snapshot.snapshot_month)), 0) +
                       -- Add incoming transfers
                   COALESCE((SELECT SUM(amount)
                             FROM bky_transfert
                             WHERE to_account_id = monthly_snapshot.account_id
                               AND date <= LAST_DAY(monthly_snapshot.snapshot_month)), 0) -
                       -- Subtract outgoing transfers
                   COALESCE((SELECT SUM(amount)
                             FROM bky_transfert
                             WHERE from_account_id = monthly_snapshot.account_id
                               AND date <= LAST_DAY(monthly_snapshot.snapshot_month)), 0) AS total_amount
            FROM MonthlySnapshots monthly_snapshot
        )
    -- Return month, account name, account color, account type and total amount
    SELECT 
        DATE_FORMAT(account_total.snapshot_month, '%Y-%m-01') AS month,
        account_total.account_name AS name,
        account_total.account_type AS type,
        account_total.total_amount AS total
    FROM AccountTotals account_total
    WHERE account_total.snapshot_month BETWEEN start_date AND end_date
    ORDER BY account_total.snapshot_month, account_total.account_name;
END;
