import { FIRST_YEAR } from '@/utils/number/NumberUtils';
import MonthSelector from '@components/theme/form/month-selector/MonthSelector';
import YearSelector from '@components/theme/form/year-selector/YearSelector';
import LabelledToggle from '@components/theme/labelled-toggle/LabelledToggle';
import useMessages from '@i18n/hooks/messagesHook';
import dayjs from 'dayjs';
import React from 'react';

/**
 * Enum for the type of monthly budget view
 */
export enum MonthlyRecapType {
  REAL = 'REAL',
  THEORETICAL = 'THEORETICAL',
}

/**
 * Props for the MonthlyBudgetControls component
 */
type MonthlyBudgetControlsProps = {
  selectedMonth: number,
  setSelectedMonth: (month: number) => void,
  selectedYear: number,
  setSelectedYear: (year: number) => void,
  viewType: MonthlyRecapType,
  setViewType: (viewType: MonthlyRecapType) => void,
};

/**
 * MonthlyBudgetControls component displays the month/year selectors and view type toggle
 * Used to control the display of the monthly budget data
 */
export default function MonthlyBudgetControls(
  {
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    viewType,
    setViewType,
  }: MonthlyBudgetControlsProps
) {
  const { messages } = useMessages();

  // Toggle handler for the view type switch
  const handleToggleViewType = React.useCallback(() => {
    setViewType(
      viewType === MonthlyRecapType.REAL
        ? MonthlyRecapType.THEORETICAL
        : MonthlyRecapType.REAL,
    );
  }, [viewType, setViewType]);

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-2">
        <MonthSelector
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <YearSelector
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          firstYear={FIRST_YEAR}
          yearRange={dayjs().year() - FIRST_YEAR +1}
        />
      </div>
      <LabelledToggle
        unCheckedLabel={messages.evolution.monthlyBudget.viewTypes[MonthlyRecapType.REAL]}
        checkedLabel={messages.evolution.monthlyBudget.viewTypes[MonthlyRecapType.THEORETICAL]}
        checked={viewType === MonthlyRecapType.THEORETICAL}
        onToggle={handleToggleViewType}
      />
    </div>
  );
}