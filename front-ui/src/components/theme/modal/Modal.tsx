import React, { PropsWithChildren } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/lib/shadcn/dialog';

type ModalProps = {
  title: string,
  description: string,
  isOpen: boolean,
};

export default function Modal(
  {
    children,
    title,
    description,
    isOpen,
  }: PropsWithChildren<ModalProps>,
) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
