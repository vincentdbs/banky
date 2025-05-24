import { Button } from '@lib/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@lib/shadcn/dialog';
import React from 'react';
import useMessages from '@/i18n/hooks/messagesHook';

/**
 * A reusable confirmation modal component that displays a confirmation dialog
 * with customizable title, description, and action buttons.
 */
type ConfirmationModalProps = {
  isOpen: boolean,
  title: string,
  description: string,
  onCancel: () => void,
  onValidate: () => void,
  cancelText?: string,
  validateText?: string,
  validateVariant?: 'outline' | 'default' | 'destructive' | 'link' | 'secondary' | 'ghost',
};

export default function ConfirmationModal(
  {
    isOpen,
    title,
    description,
    onCancel,
    onValidate,
    cancelText,
    validateText,
    validateVariant = 'default',
  }: ConfirmationModalProps,
) {
  const { messages } = useMessages();

  return (
    <Dialog
      open={isOpen}
      // onOpenChange={
      //   (open: boolean) => {
      //     if (!open) {
      //       onCancel();
      //     }
      //   }
      // }
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
          >
            {cancelText || messages.action.cancel}
          </Button>
          <Button
            variant={validateVariant}
            onClick={onValidate}
          >
            {validateText || messages.action.validate}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
