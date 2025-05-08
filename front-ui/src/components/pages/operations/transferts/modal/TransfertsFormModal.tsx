import React from 'react';
import Modal from '@components/theme/modal/Modal';
import useMessages from '@i18n/hooks/messagesHook';
import TransfertsForm from '../form/TransfertsForm';

/**
 * Modal containing a form for creating a new transfert between accounts
 */
export default function TransfertsFormModal() {
  const { messages } = useMessages();

  return (
    <Modal
      title={messages.operations.transferts.form.title}
      description={messages.operations.transferts.form.description}
      openModalLabel={messages.action.add}
    >
      <TransfertsForm />
    </Modal>
  );
}
