import { TransfertResponse } from '@api/transferts/TransfertTypes';
import {
  TransfertFields,
  TransfertFormType,
} from '@components/pages/operations/transferts/form/fields/TransfertsFormFields';
import TransfertsService from '@services/transferts/TransfertsService';
import { formatToIsoDate } from '@utils/dates/DatesUtils';
import { twoDecimalNumberToString } from '@utils/number/NumberUtils';
import dayjs from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { HttpPromise } from 'simple-http-rest-client';
import TransfertsFormModal from './TransfertsFormModal';

type UpdateTransfertFormModalProps = {
  isOpen: boolean,
  onCancel: () => void,
  transfert: TransfertResponse,
};

/**
 * A modal component for updating existing transferts.
 * Wraps the TransfertsFormModal with update-specific functionality.
 */
export default function UpdateTransfertFormModal(
  {
    isOpen,
    onCancel,
    transfert,
  }: UpdateTransfertFormModalProps,
) {
  const transfertsService: TransfertsService = getGlobalInstance(TransfertsService);

  // Convert the transfert data to form field values
  const defaultValues: TransfertFormType = {
    [TransfertFields.FROM_ACCOUNT]: transfert.fromAccountId,
    [TransfertFields.TO_ACCOUNT]: transfert.toAccountId,
    [TransfertFields.AMOUNT]: parseFloat(transfert.amount),
    [TransfertFields.DATE]: dayjs(transfert.date),
  };

  const handleSubmit = (values: TransfertFormType): HttpPromise<void> => transfertsService
    .updateTransfert(
      transfert.id,
      {
        fromAccountId: values[TransfertFields.FROM_ACCOUNT],
        toAccountId: values[TransfertFields.TO_ACCOUNT],
        amount: twoDecimalNumberToString(values[TransfertFields.AMOUNT]),
        date: formatToIsoDate(values[TransfertFields.DATE]),
      },
    ).then(() => {
      onCancel();
    });

  return (
    <TransfertsFormModal
      isOpen={isOpen}
      onCancel={onCancel}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
}
