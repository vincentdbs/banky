import { Button } from '@/lib/shadcn/button';
import { DialogFooter } from '@/lib/shadcn/dialog';
import Modal, { ModalProps } from '@components/theme/modal/Modal';
import React, { PropsWithChildren } from 'react';

type SubmitFormModalProps = PropsWithChildren<{
  openModalLabel: string,
  submitLabel: string,
}> & ModalProps;

export default function SubmitFormModal({ children, openModalLabel, title, description, submitLabel }: SubmitFormModalProps) {
  return (
    <Modal openModalLabel={openModalLabel} title={title} description={description}>
      {children}
      <DialogFooter>
        <Button type="submit">{submitLabel}</Button>
      </DialogFooter>
    </Modal>
  );
}