import { Card } from '@/lib/shadcn/card';
import {
  formatEuroDecimalPriceFromString,
  formatPercentageDecimalPriceFromString,
} from '@/utils/number/NumberUtils';
import { PLACEHOLDER } from '@/utils/string/StringUtils';
import { MonthlyBudgetCategory } from '@api/evolution/EvolutionTypes';
import useHandleFetchMonthlyBudget
  from '@hooks/use-handle-fetch-monthly-budget/useHandleFetchMonthlyBudget';
import useMessages from '@i18n/hooks/messagesHook';
import { cn } from '@lib/shadcn/utils';
import { isNotNullish } from '@utils/types/TypesUtils';
import React from 'react';
import MonthlyBudgetControls from '../controls/MonthlyBudgetControls';

/**
 * MonthlyBudgetTable component displays the monthly budget data in a structured table
 * Shows categories with spent and budgeted amounts and their percentages
 * Also displays summary information like totals and balances
 */
export default function MonthlyBudgetTable() {
  const { messages } = useMessages();

  // Use our custom hook to handle fetching monthly budget data
  const {
    currentYear,
    currentMonth,
    monthlyBudget,
    monthlyBudgetType,
    updateMonthlyBudgetType,
    handleUpdateYear,
    handleUpdateMonth,
  } = useHandleFetchMonthlyBudget();

  return (
    <div className="space-y-6">
      <MonthlyBudgetControls
        selectedMonth={currentMonth}
        setSelectedMonth={handleUpdateMonth}
        selectedYear={currentYear}
        setSelectedYear={handleUpdateYear}
        viewType={monthlyBudgetType}
        setViewType={updateMonthlyBudgetType}
      />

      {
        isNotNullish(monthlyBudget)
        && (
          <>
            <div className="rounded-md border">
              {/* Table header */}
              <div className="grid grid-cols-5 border-b bg-muted">
                <p
                  className="h-10 px-2 flex items-center text-left font-medium text-muted-foreground w-[300px]">
                  {messages.evolution.monthlyBudget.table.category}
                </p>
                <p
                  className="h-10 px-2 flex items-center justify-end font-medium text-muted-foreground">
                  {messages.evolution.monthlyBudget.table.spent}
                </p>
                <p
                  className="h-10 px-2 flex items-center justify-end font-medium text-muted-foreground">
                  {messages.evolution.monthlyBudget.table.budgeted}
                </p>
                <p
                  className="h-10 px-2 flex items-center justify-end font-medium text-muted-foreground">
                  {messages.evolution.monthlyBudget.table.spentPercentage}
                </p>
                <p
                  className="h-10 px-2 flex items-center justify-end font-medium text-muted-foreground">
                  {messages.evolution.monthlyBudget.table.totalPercentage}
                </p>
              </div>

              {/* Table body */}
              <div>
                {/* Category rows */}
                {monthlyBudget.categories.map((category: MonthlyBudgetCategory, index: number) => {
                  const isSpentGreaterThanBudgeted: boolean = parseInt(category.spent) > parseInt(category.budgeted);
                  const isSpentLessThanBudgeted: boolean = parseInt(category.spent) < parseInt(category.budgeted) && parseInt(category.spent) !== 0;
                  const isSpentPercentageHigherThanTotal: boolean = 
                    parseInt(category.spentPercentageOfBudgeted) > parseInt(category.spentPercentageOfTotal);
                  const isSpentPercentageLowerThanTotal: boolean = 
                    parseInt(category.spentPercentageOfBudgeted) < parseInt(category.spentPercentageOfTotal) && 
                    parseInt(category.spentPercentageOfBudgeted) !== 0;

                  return (
                    <div
                      key={index}
                      className={cn(
                        'grid grid-cols-5 border-b transition-colors hover:bg-muted/50',
                        index === monthlyBudget.categories.length - 1 && 'border-0',
                      )}
                    >
                      <p className="p-2 flex items-center">{category.name}</p>
                      <p className={cn(
                        'p-2 flex items-center justify-end',
                        isSpentGreaterThanBudgeted && 'text-red-500 font-bold',
                        isSpentLessThanBudgeted && 'text-green-500',
                      )}>
                        {formatEuroDecimalPriceFromString(category.spent)}
                      </p>
                      <p className="p-2 flex items-center justify-end">
                        {formatEuroDecimalPriceFromString(category.budgeted)}
                      </p>
                      <p className={cn(
                        'p-2 flex items-center justify-end',
                        isSpentPercentageHigherThanTotal && 'text-red-500 font-bold',
                        isSpentPercentageLowerThanTotal && 'text-green-500',
                      )}>
                        {formatPercentageDecimalPriceFromString(category.spentPercentageOfBudgeted)}
                      </p>
                      <p className="p-2 flex items-center justify-end">
                        {formatPercentageDecimalPriceFromString(category.spentPercentageOfTotal)}
                      </p>
                    </div>
                  );
                })}

                {/* Summary rows */}
                {/* Total épargne row */}
                <div className="grid grid-cols-5 border-b bg-muted/50">
                  <p className="p-2 align-middle font-semibold">
                    {messages.evolution.monthlyBudget.table.totalSavings}
                  </p>
                  <p className="p-2 align-middle text-right font-semibold">
                    {formatEuroDecimalPriceFromString(monthlyBudget.savings)}
                  </p>
                  <p className="p-2 align-middle text-right font-semibold">
                    {formatEuroDecimalPriceFromString(monthlyBudget.budgetedSavings)}
                  </p>
                  <p className="p-2 align-middle text-right font-semibold">
                    {PLACEHOLDER}
                  </p>
                  <p className="p-2 align-middle text-right font-semibold">
                    {PLACEHOLDER}
                  </p>
                </div>

                {/* Frais bourse row */}
                <div className="grid grid-cols-5 border-b bg-muted/50">
                  <p className="p-2 align-middle font-semibold">
                    {messages.evolution.monthlyBudget.table.stockFees}
                  </p>
                  <p className="p-2 align-middle text-right font-semibold">
                    {formatEuroDecimalPriceFromString(monthlyBudget.orderCharges)}
                  </p>
                  <p className="p-2 align-middle text-right font-semibold">
                    {PLACEHOLDER}
                  </p>
                  <p className="p-2 align-middle text-right font-semibold">
                    {PLACEHOLDER}
                  </p>
                  <p className="p-2 align-middle text-right font-semibold">
                    {PLACEHOLDER}
                  </p>
                </div>

                <div className="grid grid-cols-5 border-b bg-muted/50">
                  <p className="p-2 align-middle font-bold">
                    {messages.evolution.monthlyBudget.table.total}
                  </p>
                  <p className="p-2 align-middle text-right font-bold">
                    {formatEuroDecimalPriceFromString(monthlyBudget.total)}
                  </p>
                  <p className="p-2 align-middle text-right font-bold">
                    {formatEuroDecimalPriceFromString(monthlyBudget.budgetedTotal)}
                  </p>
                  <p className="p-2 align-middle text-right font-bold">
                    {formatPercentageDecimalPriceFromString(monthlyBudget.spentPercentageOfBudgeted)}
                  </p>
                  <p className="p-2 align-middle text-right font-bold">
                    {formatPercentageDecimalPriceFromString(monthlyBudget.spentPercentageOfTotal)}
                  </p>
                </div>

                <div className="grid grid-cols-5 bg-gray-100">
                  <p className="p-2 align-middle">
                    {messages.evolution.monthlyBudget.table.totalWithoutSavings}
                  </p>
                  <p className="p-2 align-middle text-right">
                    {formatEuroDecimalPriceFromString(monthlyBudget.totalWithoutSavings)}
                  </p>
                  <p className="p-2 align-middle text-right">
                    {formatEuroDecimalPriceFromString(monthlyBudget.budgetedTotalWithoutSavings)}
                  </p>
                  <p className="p-2 align-middle text-right">
                    {formatPercentageDecimalPriceFromString(monthlyBudget.spentWithoutSavingsPercentage)}
                  </p>
                  <p className="p-2 align-middle text-right">
                    {formatPercentageDecimalPriceFromString(monthlyBudget.budgetedWithoutSavingsPercentage)}
                  </p>
                </div>
              </div>
            </div>

            {/* Balance section */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="py-2 px-4">
                <p className="font-semibold">
                  {messages.evolution.monthlyBudget.table.balance}
                </p>
                <p className="font-bold">
                  {formatEuroDecimalPriceFromString(monthlyBudget.balance)}
                </p>
              </Card>
              <Card className="py-2 px-4">
                <p className="font-semibold">
                  {messages.evolution.monthlyBudget.table.balanceWithoutSavings}
                </p>
                <p className="font-bold">
                  {formatEuroDecimalPriceFromString(monthlyBudget.balanceWithoutSavings)}
                </p>
              </Card>
            </div>
          </>
        )
      }
    </div>
  );
}