import React, { useState } from 'react';
import useMessages from '@i18n/hooks/messagesHook';
import { MonthlyBudgetCategory, MonthlyBudgetResponse } from '@api/evolution/EvolutionTypes';
import { cn } from '@lib/shadcn/utils';
import MonthlyBudgetControls, { MonthlyRecapType } from '../controls/MonthlyBudgetControls';
import dayjs from 'dayjs';
import { formatPercentageDecimalPriceFromString, formatEuroDecimalPriceFromString } from '@/utils/number/NumberUtils';
import { Card } from '@/lib/shadcn/card';

/**
 * Props for the MonthlyBudgetTable component
 */
type MonthlyBudgetTableProps = {
  monthlyBudget: MonthlyBudgetResponse,
};

/**
 * MonthlyBudgetTable component displays the monthly budget data in a structured table
 * Shows categories with spent and budgeted amounts and their percentages
 * Also displays summary information like totals and balances
 * 
 * This version uses CSS grid instead of the Table component from shadcn/ui
 */
export default function MonthlyBudgetTable({ monthlyBudget }: MonthlyBudgetTableProps) {
  const { messages } = useMessages();
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [viewType, setViewType] = useState<MonthlyRecapType>(MonthlyRecapType.REAL);

  return (
    <div className="space-y-6">
      <MonthlyBudgetControls
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        viewType={viewType}
        setViewType={setViewType}
      />

      <div className="rounded-md border">
        {/* Table header */}
        <div className="grid grid-cols-5 border-b bg-muted">
          <p className="h-10 px-2 flex items-center text-left font-medium text-muted-foreground w-[300px]">
            {messages.evolution.monthlyBudget.table.category}
          </p>
          <p className="h-10 px-2 flex items-center justify-end font-medium text-muted-foreground">
            {messages.evolution.monthlyBudget.table.spent}
          </p>
          <p className="h-10 px-2 flex items-center justify-end font-medium text-muted-foreground">
            {messages.evolution.monthlyBudget.table.budgeted}
          </p>
          <p className="h-10 px-2 flex items-center justify-end font-medium text-muted-foreground">
            {messages.evolution.monthlyBudget.table.spentPercentage}
          </p>
          <p className="h-10 px-2 flex items-center justify-end font-medium text-muted-foreground">
            {messages.evolution.monthlyBudget.table.budgetedPercentage}
          </p>
        </div>

        {/* Table body */}
        <div>
          {/* Category rows */}
          {monthlyBudget.categories.map((category: MonthlyBudgetCategory, index: number) => {
            const isSpentGreaterThanBudgeted: boolean = parseInt(category.spent) > parseInt(category.budgeted);
            const isSpentLessThanBudgeted: boolean = parseInt(category.spent) < parseInt(category.budgeted) && parseInt(category.spent) !== 0;
            const isSpentPercentageGreaterThanBudgetedPercentage: boolean =
              parseInt(category.spentPercentage) > parseInt(category.budgetedPercentage);
            const isSpentPercentageLessThanBudgetedPercentage: boolean =
              parseInt(category.spentPercentage) < parseInt(category.budgetedPercentage) && parseInt(category.spentPercentage) !== 0;
            
            return (
              <div 
                key={index} 
                className={cn(
                  "grid grid-cols-5 border-b transition-colors hover:bg-muted/50",
                  index === monthlyBudget.categories.length - 1 && "border-0"
                )}
              >
                <p className="p-2 flex items-center">{category.name}</p>
                <p className={cn(
                  "p-2 flex items-center justify-end",
                  isSpentGreaterThanBudgeted && "text-red-500 font-bold",
                  isSpentLessThanBudgeted && "text-green-500"
                )}>
                  {formatEuroDecimalPriceFromString(category.spent)}
                </p>
                <p className="p-2 flex items-center justify-end">
                  {formatEuroDecimalPriceFromString(category.budgeted)}
                </p>
                <p className={cn(
                  "p-2 flex items-center justify-end",
                  isSpentPercentageGreaterThanBudgetedPercentage && "text-red-500 font-bold",
                  isSpentPercentageLessThanBudgetedPercentage && "text-green-500"
                )}>
                  {formatPercentageDecimalPriceFromString(category.spentPercentage)}
                </p>
                <p className="p-2 flex items-center justify-end">
                  {formatPercentageDecimalPriceFromString(category.budgetedPercentage)}
                </p>
              </div>
            );
          })}
          
          {/* Summary rows */}
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
              {formatPercentageDecimalPriceFromString(monthlyBudget.spentPercentage)}
            </p>
            <p className="p-2 align-middle text-right font-bold">
              {formatPercentageDecimalPriceFromString(monthlyBudget.budgetedPercentage)}
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
    </div>
  );
}