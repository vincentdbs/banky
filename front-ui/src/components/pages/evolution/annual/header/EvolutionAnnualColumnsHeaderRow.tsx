import useMessages from '@i18n/hooks/messagesHook';
import React from 'react';

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
      <div className="bg-slate-50 p-3 font-medium border-b border-r">
        {messages.evolution.annual.shortName}
      </div>
      <div className="bg-slate-50 p-3 font-medium border-b border-r">
        {messages.evolution.annual.name}
      </div>
      {monthDates.map((date: string) => (
        <React.Fragment key={`titles-${date}`}>
          <div className="bg-slate-50 p-3 font-medium text-center border-b border-r">
            {messages.evolution.annual.amount}
          </div>
          <div className="bg-slate-50 p-3 font-medium text-center border-b border-r">
            {messages.evolution.annual.gainLoss}
          </div>
          <div className="bg-slate-50 p-3 font-medium text-center border-b border-r">
            {messages.evolution.annual.percentage}
          </div>
        </React.Fragment>
      ))}
    </>
  );
}