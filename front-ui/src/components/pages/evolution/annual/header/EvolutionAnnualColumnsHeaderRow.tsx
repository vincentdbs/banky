import useMessages from '@i18n/hooks/messagesHook';
import React from 'react';
import HeaderCell from '@components/theme/table/cells/header/HeaderCell';

type EvolutionAnnualColumnsTitlesRowProps = {
  monthDates: string[],
};

/**
 * Displays the column titles row with shortName, name, amount, gain/loss, and percentage
 */
export default function EvolutionAnnualColumnsHeaderRow({ monthDates }: EvolutionAnnualColumnsTitlesRowProps) {
  const { messages } = useMessages();

  return (
    <>
      <HeaderCell>
        {messages.evolution.annual.shortName}
      </HeaderCell>
      <HeaderCell>
        {messages.evolution.annual.name}
      </HeaderCell>
      {monthDates.map((date: string) => (
        <React.Fragment key={`titles-${date}`}>
          <HeaderCell align="center">
            {messages.evolution.annual.amount}
          </HeaderCell>
          <HeaderCell align="center">
            {messages.evolution.annual.gainLoss}
          </HeaderCell>
          <HeaderCell align="center">
            {messages.evolution.annual.percentage}
          </HeaderCell>
        </React.Fragment>
      ))}
    </>
  );
}
