create
    definer = banky@`%` procedure get_account_monthly_evolution(IN p_start_date date, IN p_end_date date)
BEGIN
    WITH RECURSIVE
        DateRange AS (
            -- Generate all months in the specified date range
            SELECT DATE_FORMAT(p_start_date, '%Y-%m-01') AS month_date
            UNION ALL
            SELECT DATE_FORMAT(DATE_ADD(month_date, INTERVAL 1 MONTH), '%Y-%m-01')
            FROM DateRange
            WHERE DATE_FORMAT(DATE_ADD(month_date, INTERVAL 1 MONTH), '%Y-%m-01') <=
                  DATE_FORMAT(p_end_date, '%Y-%m-01')),
        MonthlySnapshots AS (
            -- Generate all possible combinations of months and accounts in date range
            SELECT a.id          AS account_id,
                   a.name        AS account_name,
                   a.short_name  AS account_short_name,
                   a.type        AS account_type,
                   a.initial_amount,
                   dr.month_date AS snapshot_month
            FROM bky_accounts a
                     CROSS JOIN DateRange dr),

        AccountTotals AS (SELECT ms.account_id,
                                 ms.account_name,
                                 ms.account_short_name,
                                 ms.account_type,
                                 ms.snapshot_month,
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
                                             AND date <= LAST_DAY(ms.snapshot_month)),
                                          0) AS total_amount
                          FROM MonthlySnapshots ms)

    SELECT current_month.account_short_name,
           current_month.account_name,
           current_month.account_id,
           current_month.account_type,
           current_month.snapshot_month                                    AS month,
           current_month.total_amount,
           (current_month.total_amount -
            COALESCE(prev_month.total_amount, current_month.total_amount)) AS gain_loss
    FROM AccountTotals current_month
             LEFT JOIN AccountTotals prev_month ON
        current_month.account_id = prev_month.account_id AND
        prev_month.snapshot_month =
        DATE_FORMAT(DATE_SUB(current_month.snapshot_month, INTERVAL 1 MONTH), '%Y-%m-01')
    WHERE current_month.snapshot_month BETWEEN p_start_date AND p_end_date
    ORDER BY current_month.snapshot_month, current_month.account_id, current_month.account_name;
END;

