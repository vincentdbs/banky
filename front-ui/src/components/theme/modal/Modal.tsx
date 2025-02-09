import { Button } from '@/lib/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/shadcn/dialog';
import React, { PropsWithChildren } from 'react';

export type ModalProps = {
  title: string,
  description: string,
  openModalLabel: string,
};

export default function Modal({ children, openModalLabel, title, description }: PropsWithChildren<ModalProps>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{openModalLabel}</Button>
      </DialogTrigger>
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