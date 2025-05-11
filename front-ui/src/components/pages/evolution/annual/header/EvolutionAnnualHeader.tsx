import { getMonthName } from '@utils/dates/DatesUtils';
import React from 'react';
import HeaderCell from '@components/theme/table/cells/header/HeaderCell';

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
      <HeaderCell className="col-span-2">
        {year}
      </HeaderCell>
      {
        monthDates.map((date: string) => (
          <HeaderCell key={date} align="center" className="col-span-3 capitalize">
            {getMonthName(date)}
          </HeaderCell>
        ))
      }
    </>
  );
}
