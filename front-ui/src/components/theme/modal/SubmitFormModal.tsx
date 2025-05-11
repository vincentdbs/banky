import Modal from '@components/theme/modal/Modal';
import useMessages from '@i18n/hooks/messagesHook';
import { Form } from '@lib/shadcn/form';
import React, { ComponentProps, PropsWithChildren } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Button } from '@/lib/shadcn/button';

type SubmitFormModalProps<T extends FieldValues> = PropsWithChildren<{
  onCancel: () => void,
  isOpen: boolean,
  form: UseFormReturn<T>,
  onSubmit: (values: T) => void,
}> & ComponentProps<typeof Modal>;

export default function SubmitFormModal<T extends FieldValues>(
  {
    children,
    form,
    title,
    onCancel,
    isOpen,
    description,
    onSubmit,
  }: SubmitFormModalProps<T>,
) {
  const { messages } = useMessages();

  return (
    <Modal title={title} isOpen={isOpen} description={description}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {children}
          <div className="flex justify-around gap-2 mt-8">
            <Button
              className="flex-1"
              onClick={onCancel}
              type="button"
              variant="outline">
              {messages.action.cancel}
            </Button>
            <Button
              className="flex-1"
              type="submit"
            >
              {messages.action.save}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
