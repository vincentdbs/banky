import ParametersLayout from '@components/layout/parameters/ParametersLayout';
import useMessages from '@i18n/hooks/messagesHook';
import React from 'react';

export default function Categories() {
  const { messages } = useMessages();

  return (
    <ParametersLayout
      title={messages.parameters.categories.title}
      subTitle={messages.parameters.categories.subTitle}
    >
      <p>TODO</p>
    </ParametersLayout>
  );
}
