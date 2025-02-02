import useMessages from '@i18n/hooks/messagesHook';
import React from 'react';

export default function Home() {
  const { messages } = useMessages();

  return (
    <div>
      <h1>{messages.home.title}</h1>
    </div>
  );
}
