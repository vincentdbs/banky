import Modal from '@components/theme/modal/Modal';
import useMessages from '@i18n/hooks/messagesHook';
import React from 'react';
import TransactionsForm from '../form/TransactionsForm';

export default function TransactionsFormModal() {
  const { messages } = useMessages();

  return (
    <Modal
      title={messages.operations.transactions.form.title}
      description={messages.operations.transactions.form.description}
      openModalLabel={messages.action.add}
    >
      <TransactionsForm />
    </Modal>
  );
}
