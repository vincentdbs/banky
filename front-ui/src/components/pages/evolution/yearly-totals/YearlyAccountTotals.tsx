import useMessages from '@i18n/hooks/messagesHook';
import React from 'react';
import useYearlyAccountTotals from './useYearlyAccountTotals';

/**
 * Component for displaying yearly account totals
 * Shows account totals for a selected year and two preceding years by month
 */
export default function YearlyAccountTotals() {
  const { messages } = useMessages();
  const {
    yearlyTotals,
    selectedYear,
    handleYearChange,
    isLoading,
  } = useYearlyAccountTotals();

  return (
    // TODO
    <></>
  );
}
