import MoneyRecapCard from '@components/theme/cards/money-recap/MoneyRecapCard';
import React from 'react';
import useMessages from '@/i18n/hooks/messagesHook';

export default function MoneyRecapCards() {
  const { messages } = useMessages();

  return (
    <>
      <MoneyRecapCard
        title={messages.common.treasury}
        amount={15231.89}
        percentage={-20.1}
        subAmountLine={messages.dashboard.cards.fromLastMonth}
      />
      <MoneyRecapCard
        title={messages.common.incomes}
        amount={15231.89}
        percentage={20.1}
        subAmountLine={messages.dashboard.cards.fromLastMonth}
      />
      <MoneyRecapCard
        title={messages.common.expenses}
        amount={15231.89}
        percentage={20.1}
        subAmountLine={messages.dashboard.cards.fromLastMonth}
      />
      <MoneyRecapCard
        title={messages.common.savings}
        amount={15231.89}
        percentage={20.1}
        subAmountLine={messages.dashboard.cards.fromLastMonth}
      />
    </>
  );
}
