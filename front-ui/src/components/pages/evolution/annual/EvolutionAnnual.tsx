import React from 'react';
import dayjs from 'dayjs';
import { formatCurrency, formatPercentage } from '@/utils/number/NumberUtils';
import useMessages from '@/i18n/hooks/messagesHook';

/**
 * Types for accounts data structure
 */
type TotalByAccount = {
  id: string,
  shortName: string,
  name: string,
  total: number,
  gainLoss: number,
  gainLossPercentage: number,
};

type TotalByCategory = {
  total: number,
  gainLoss: number,
  gainLossPercentage: number,
  totalByAccount: TotalByAccount[],
};

type TotalByAccountAndMonth = {
  total: number,
  gainLoss: number,
  gainLossPercentage: number,
  totalByCategory: Record<string, TotalByCategory>, // string is the banking account type (CHECKING, SAVINGS, MARKET)
};

type AnnualTotal = Record<string, TotalByAccountAndMonth>; // string is a local date (YYYY-MM-DD) of the first day of the month for the year

type YearSummary = {
  total: number,
  gainLoss: number,
  interest: number,
};

type EvolutionAnnualProps = {
  year?: number,
  annualTotal?: AnnualTotal,
  yearSummary?: YearSummary,
};

/**
 * A component that displays an annual evolution table for financial accounts,
 * showing monthly values and gain/loss metrics grouped by account type.
 * The table follows a grid layout with accounts organized by their type,
 * displaying subtotals for each account category and a grand total.
 */
export default function EvolutionAnnual({
  year = dayjs().year(),
  annualTotal = {},
  yearSummary = { total: 0, gainLoss: 0, interest: 0 },
}: EvolutionAnnualProps) {
  const { messages } = useMessages();
  
  // Account categories we want to display
  const accountCategories = ['CHECKING', 'SAVINGS', 'MARKET'];

  // Create an array of month dates for the year in chronological order
  const monthDates = Array.from({ length: 12 }, (_, i) => {
    return dayjs(new Date(year, i, 1)).format('YYYY-MM-DD');
  });

  // Function to get month name from date
  const getMonthName = (dateString: string) => {
    return dayjs(dateString).format('MMMM');
  };

  // Create a mapping function to get category display names
  const getCategoryDisplayName = (category: string) => {
    const categoryKey = category.toLowerCase();
    return messages.evolution?.annual?.[categoryKey] || category;
  };

  return (
    <div className="w-full overflow-auto">
      <div className="min-w-[1200px] rounded-md border">
        {/* Table using grid layout */}
        <div className="text-sm grid">
          {/* Grid columns definition - first two columns for account info, then 3 columns per month */}
          <div className="grid grid-cols-[120px_180px_repeat(36,minmax(90px,1fr))]">
            {/* Header row 1 - Months */}
            <div className="col-span-2 bg-slate-50 p-3 font-medium border-b border-r">{year}</div>
            {monthDates.map((date) => (
              <div key={`month-${date}`} className="col-span-3 bg-slate-50 p-3 font-medium text-center border-b border-r capitalize">
                {getMonthName(date)}
              </div>
            ))}

            {/* Header row 2 - Column titles */}
            <div className="bg-slate-50 p-3 font-medium border-b border-r">
              {messages.evolution?.annual?.shortName || 'ShortName'}
            </div>
            <div className="bg-slate-50 p-3 font-medium border-b border-r">
              {messages.evolution?.annual?.name || 'Name'}
            </div>
            {monthDates.map((date) => (
              <React.Fragment key={`titles-${date}`}>
                <div className="bg-slate-50 p-3 font-medium text-center border-b border-r">
                  {messages.evolution?.annual?.amount || 'Amount'}
                </div>
                <div className="bg-slate-50 p-3 font-medium text-center border-b border-r">
                  {messages.evolution?.annual?.gainLoss || 'Gain/Loss'}
                </div>
                <div className="bg-slate-50 p-3 font-medium text-center border-b border-r">
                  {messages.evolution?.annual?.percentage || '%'}
                </div>
              </React.Fragment>
            ))}

            {/* Content rows - Accounts by category */}
            {accountCategories.map((category) => {
              // Get accounts for this category from all months
              const accountsMap = new Map<string, TotalByAccount>();
              
              // Collect unique accounts across all months for this category
              monthDates.forEach(monthDate => {
                const monthData = annualTotal[monthDate];
                if (monthData && monthData.totalByCategory[category]) {
                  monthData.totalByCategory[category].totalByAccount.forEach(account => {
                    if (!accountsMap.has(account.id)) {
                      accountsMap.set(account.id, account);
                    }
                  });
                }
              });
              
              const accounts = Array.from(accountsMap.values());
              
              if (accounts.length === 0) {
                return null;
              }
              
              return (
                <React.Fragment key={category}>
                  {/* Render accounts of this category */}
                  {accounts.map((account) => (
                    <React.Fragment key={account.id}>
                      {/* Account short name and full name */}
                      <div className="p-3 border-b border-r">{account.shortName}</div>
                      <div className="p-3 border-b border-r">{account.name}</div>
                      
                      {/* Monthly data for this account */}
                      {monthDates.map((monthDate) => {
                        const monthData = annualTotal[monthDate];
                        let accountData: TotalByAccount | undefined;
                        
                        if (monthData && monthData.totalByCategory[category]) {
                          accountData = monthData.totalByCategory[category].totalByAccount.find(
                            acc => acc.id === account.id
                          );
                        }
                        
                        // Default values if no data exists for this month
                        const total = accountData?.total || 0;
                        const gainLoss = accountData?.gainLoss || 0;
                        const gainLossPercentage = accountData?.gainLossPercentage || 0;
                        
                        return (
                          <React.Fragment key={`${account.id}-${monthDate}`}>
                            <div className={`p-3 text-right border-b border-r ${total < 0 ? 'text-red-600' : ''}`}>
                              {formatCurrency(total)}
                            </div>
                            <div className={`p-3 text-right border-b border-r ${gainLoss < 0 ? 'text-red-600' : gainLoss > 0 ? 'text-green-600' : ''}`}>
                              {formatCurrency(gainLoss)}
                            </div>
                            <div className={`p-3 text-right border-b border-r ${gainLossPercentage < 0 ? 'text-red-600' : gainLossPercentage > 0 ? 'text-green-600' : ''}`}>
                              {formatPercentage(gainLossPercentage)}
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </React.Fragment>
                  ))}

                  {/* Subtotal row for this category */}
                  <div className="col-span-2 p-3 font-medium bg-slate-100 border-b border-r">
                    {messages.evolution?.annual?.subTotal || 'Sub Total'}
                  </div>
                  
                  {/* Monthly subtotals for this category */}
                  {monthDates.map((monthDate) => {
                    const monthData = annualTotal[monthDate];
                    const categoryData = monthData?.totalByCategory[category];
                    
                    // Default values if no data exists for this month
                    const total = categoryData?.total || 0;
                    const gainLoss = categoryData?.gainLoss || 0;
                    const gainLossPercentage = categoryData?.gainLossPercentage || 0;
                    
                    return (
                      <React.Fragment key={`${category}-subtotal-${monthDate}`}>
                        <div className={`p-3 text-right font-medium bg-slate-100 border-b border-r ${total < 0 ? 'text-red-600' : ''}`}>
                          {formatCurrency(total)}
                        </div>
                        <div className={`p-3 text-right font-medium bg-slate-100 border-b border-r ${gainLoss < 0 ? 'text-red-600' : gainLoss > 0 ? 'text-green-600' : ''}`}>
                          {formatCurrency(gainLoss)}
                        </div>
                        <div className={`p-3 text-right font-medium bg-slate-100 border-b border-r ${gainLossPercentage < 0 ? 'text-red-600' : gainLossPercentage > 0 ? 'text-green-600' : ''}`}>
                          {formatPercentage(gainLossPercentage)}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}

            {/* Grand total row */}
            <div className="col-span-2 p-3 font-bold bg-slate-200 border-b border-r">
              {messages.evolution?.annual?.total || 'Total'}
            </div>
            
            {/* Monthly grand totals */}
            {monthDates.map((monthDate) => {
              const monthData = annualTotal[monthDate];
              
              // Default values if no data exists for this month
              const total = monthData?.total || 0;
              const gainLoss = monthData?.gainLoss || 0;
              const gainLossPercentage = monthData?.gainLossPercentage || 0;
              
              return (
                <React.Fragment key={`grand-total-${monthDate}`}>
                  <div className={`p-3 text-right font-bold bg-slate-200 border-b border-r ${total < 0 ? 'text-red-600' : ''}`}>
                    {formatCurrency(total)}
                  </div>
                  <div className={`p-3 text-right font-bold bg-slate-200 border-b border-r ${gainLoss < 0 ? 'text-red-600' : gainLoss > 0 ? 'text-green-600' : ''}`}>
                    {formatCurrency(gainLoss)}
                  </div>
                  <div className={`p-3 text-right font-bold bg-slate-200 border-b border-r ${gainLossPercentage < 0 ? 'text-red-600' : gainLossPercentage > 0 ? 'text-green-600' : ''}`}>
                    {formatPercentage(gainLossPercentage)}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}