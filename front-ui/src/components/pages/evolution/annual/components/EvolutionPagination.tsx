import React from 'react';
import { Button } from '@lib/shadcn/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useMessages from '@i18n/hooks/messagesHook';
import dayjs, { Dayjs } from 'dayjs';

/**
 * Custom pagination component for Evolution Annual table
 * that handles month range navigation
 */
type EvolutionPaginationProps = {
  currentDate: Dayjs,
  monthsToDisplay: number,
  onPreviousPeriod: () => void,
  onNextPeriod: () => void,
  isFirstPeriod: boolean,
  isLastPeriod: boolean,
};

export default function EvolutionPagination({
  currentDate,
  monthsToDisplay,
  onPreviousPeriod,
  onNextPeriod,
  isFirstPeriod,
  isLastPeriod,
}: EvolutionPaginationProps) {
  // Format the date range for display
  const formatDateRange = (): string => {
    const startMonth: string = currentDate.format('MMMM YYYY');
    const endMonth: string = currentDate.add(monthsToDisplay - 1, 'month').format('MMMM YYYY');
    
    if (startMonth === endMonth) {
      return startMonth;
    }
    
    return `${startMonth} - ${endMonth}`;
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-lg font-medium">
        {formatDateRange()}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPreviousPeriod}
          disabled={isFirstPeriod}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onNextPeriod}
          disabled={isLastPeriod}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
