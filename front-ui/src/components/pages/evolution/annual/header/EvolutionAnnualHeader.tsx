import React from 'react';
import { getMonthName } from '@/utils/dates/DatesUtils';

type EvolutionAnnualHeaderProps = {
  year: number,
  monthDates: string[],
};

/**
 * Displays the header row with the year and month names
 */
export default function EvolutionAnnualHeader({ year, monthDates }: EvolutionAnnualHeaderProps) {
  return (
    <>
      <div className="col-span-2 bg-slate-50 p-3 font-medium border-b border-r">{year}</div>
      {
        monthDates.map((date: string) => (
          <div
            key={`month-${date}`}
            className="col-span-3 bg-slate-50 p-3 font-medium text-center border-b border-r capitalize"
          >
            {getMonthName(date)}
          </div>
        ))
      }
    </>
  );
}
