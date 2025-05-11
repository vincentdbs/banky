-- This stored procedure returns the month, the name of the account, and the total of account
-- for each month of the last three years from the initial year passed as parameter
create
    definer = banky@`%` procedure get_account_monthly_totals_by_year(IN p_initial_year INT)
BEGIN
    DECLARE start_date DATE;
    DECLARE end_date DATE;

    -- Set the date range for the last three years from the initial year
    SET start_date = CONCAT(p_initial_year - 2, '-01-01');
    SET end_date = CONCAT(p_initial_year, '-12-31');

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
            SELECT a.id          AS account_id,
                   a.name        AS account_name,
                   a.short_name  AS account_short_name,
                   a.color       AS account_color,
                   a.type        AS account_type,
                   a.initial_amount,
                   dr.month_date AS snapshot_month
            FROM bky_accounts a
                     CROSS JOIN DateRange dr
        ),
        AccountTotals AS (
            SELECT ms.account_id,
                   ms.account_name,
                   ms.account_short_name,
                   ms.account_color,
                   ms.account_type,
                   ms.snapshot_month,
                   YEAR(ms.snapshot_month) AS year,
                   MONTH(ms.snapshot_month) AS month_number,
                   DATE_FORMAT(ms.snapshot_month, '%b') AS month_short_name,
                   ms.initial_amount +
                       -- Add credit transactions
                   COALESCE((SELECT SUM(amount)
                             FROM bky_transactions
                             WHERE account_id = ms.account_id
                               AND side = 'CREDIT'
                               AND date <= LAST_DAY(ms.snapshot_month)), 0) -
                       -- Subtract debit transactions
                   COALESCE((SELECT SUM(amount)
                             FROM bky_transactions
                             WHERE account_id = ms.account_id
                               AND side = 'DEBIT'
                               AND date <= LAST_DAY(ms.snapshot_month)), 0) +
                       -- Add incoming transfers
                   COALESCE((SELECT SUM(amount)
                             FROM bky_transfert
                             WHERE to_account_id = ms.account_id
                               AND date <= LAST_DAY(ms.snapshot_month)), 0) -
                       -- Subtract outgoing transfers
                   COALESCE((SELECT SUM(amount)
                             FROM bky_transfert
                             WHERE from_account_id = ms.account_id
                               AND date <= LAST_DAY(ms.snapshot_month)), 0) AS total_amount
            FROM MonthlySnapshots ms
        )    -- Return only the three required fields: month, account name, and total amount
    SELECT 
        DATE_FORMAT(at.snapshot_month, '%Y-%m-01') AS month,
        at.account_name AS name,
        at.total_amount AS total
    FROM AccountTotals at
    WHERE at.snapshot_month BETWEEN start_date AND end_date
    ORDER BY at.snapshot_month, at.account_name;
END;
