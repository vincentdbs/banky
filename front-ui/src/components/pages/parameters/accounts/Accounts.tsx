import ParametersLayout from '@components/layout/parameters/ParametersLayout';
import useMessages from '@i18n/hooks/messagesHook';
import React from 'react';

export default function Accounts() {
  const { messages } = useMessages();

  return (
    <ParametersLayout
      title={messages.parameters.accounts.title}
      subTitle={messages.parameters.accounts.subTitle}
    >
      <p>TODO</p>
    </ParametersLayout>
  );
}
