import React from 'react';
import useMessages from '@i18n/hooks/messagesHook';
import { MonthlyBudgetCategory, MonthlyBudgetResponse } from '@api/evolution/EvolutionTypes';
import { cn } from '@lib/shadcn/utils';

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

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        {/* Table header */}
        <div className="grid grid-cols-5 border-b bg-background">
          <div className="h-10 px-2 text-left align-middle font-medium text-muted-foreground w-[300px]">
            {messages.evolution.monthlyBudget.table.category}
          </div>
          <div className="h-10 px-2 text-right align-middle font-medium text-muted-foreground">
            {messages.evolution.monthlyBudget.table.spent}
          </div>
          <div className="h-10 px-2 text-right align-middle font-medium text-muted-foreground">
            {messages.evolution.monthlyBudget.table.spentPercentage}
          </div>
          <div className="h-10 px-2 text-right align-middle font-medium text-muted-foreground">
            {messages.evolution.monthlyBudget.table.budgeted}
          </div>
          <div className="h-10 px-2 text-right align-middle font-medium text-muted-foreground">
            {messages.evolution.monthlyBudget.table.budgetedPercentage}
          </div>
        </div>

        {/* Table body */}
        <div>
          {/* Category rows */}
          {monthlyBudget.categories.map((category: MonthlyBudgetCategory, index: number) => (
            <div 
              key={index} 
              className={cn(
                "grid grid-cols-5 border-b transition-colors hover:bg-muted/50",
                index === monthlyBudget.categories.length - 1 && "border-0"
              )}
            >
              <div className="p-2 align-middle font-medium">{category.name}</div>
              <div className="p-2 align-middle text-right">{category.spent}</div>
              <div className="p-2 align-middle text-right">{category.spentPercentage}</div>
              <div className="p-2 align-middle text-right">{category.budgeted}</div>
              <div className="p-2 align-middle text-right">{category.budgetedPercentage}</div>
            </div>
          ))}
          
          {/* Summary rows */}
          <div className="grid grid-cols-5 border-b bg-muted/50">
            <div className="p-2 align-middle font-bold">
              {messages.evolution.monthlyBudget.table.total}
            </div>
            <div className="p-2 align-middle text-right font-bold">
              {monthlyBudget.total}
            </div>
            <div className="p-2 align-middle text-right font-bold">
              {monthlyBudget.spentPercentage}
            </div>
            <div className="p-2 align-middle text-right font-bold">
              {monthlyBudget.budgetedTotal}
            </div>
            <div className="p-2 align-middle text-right font-bold">
              {monthlyBudget.budgetedPercentage}
            </div>
          </div>
          
          <div className="grid grid-cols-5 bg-muted/50">
            <div className="p-2 align-middle font-bold">
              {messages.evolution.monthlyBudget.table.totalWithoutSavings}
            </div>
            <div className="p-2 align-middle text-right font-bold">
              {monthlyBudget.totalWithoutSavings}
            </div>
            <div className="p-2 align-middle text-right font-bold">
              {monthlyBudget.spentWithoutSavingsPercentage}
            </div>
            <div className="p-2 align-middle text-right font-bold">
              {monthlyBudget.budgetedTotalWithoutSavings}
            </div>
            <div className="p-2 align-middle text-right font-bold">
              {monthlyBudget.budgetedWithoutSavingsPercentage}
            </div>
          </div>
        </div>
      </div>
      
      {/* Balance section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-md border p-4">
          <div className="text-lg font-semibold mb-2">
            {messages.evolution.monthlyBudget.table.balance}
          </div>
          <div className="text-2xl font-bold">
            {monthlyBudget.balance}
          </div>
        </div>
        
        <div className="rounded-md border p-4">
          <div className="text-lg font-semibold mb-2">
            {messages.evolution.monthlyBudget.table.balanceWithoutSavings}
          </div>
          <div className="text-2xl font-bold">
            {monthlyBudget.balanceWithoutSavings}
          </div>
        </div>
      </div>
    </div>
  );
}