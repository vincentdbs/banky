import ParametersLayout from '@components/layout/parameters/ParametersLayout';
import useMessages from '@i18n/hooks/messagesHook';
import React from 'react';

export default function SubCategories() {
  const { messages } = useMessages();

  return (
    <ParametersLayout
      title={messages.parameters.subCategories.title}
      subTitle={messages.parameters.subCategories.subTitle}
    >
      <p>TODO</p>
    </ParametersLayout>
  );
}
