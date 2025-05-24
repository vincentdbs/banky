import { TransfertResponse } from '@api/transferts/TransfertTypes';
import UpdateTransfertFormModal from '@components/pages/operations/transferts/modal/UpdateTransfertFormModal';
import useMessages from '@i18n/hooks/messagesHook';
import { Button } from '@lib/shadcn/button';
import { isNotNullish } from '@utils/types/TypesUtils';
import { Pencil, Trash2 } from 'lucide-react';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import { formatEuroDecimalPriceFromString } from '@/utils/number/NumberUtils';
import { formatToLocalDateOrPlaceholder } from '@/utils/dates/DatesUtils';
import TransfertsService from '@/services/transferts/TransfertsService';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/lib/shadcn/table';
import ConfirmationModal from '@/components/theme/modal/ConfirmationModal';

type TransfertsTableProps = {
  transferts: TransfertResponse[],
  onEditTransfert?: (transfert: TransfertResponse) => void,
  onTransfertDeleted: () => void,
};

/**
 * Displays a table of transferts between accounts
 */
export default function TransfertsTable(
  {
    transferts,
    onEditTransfert,
    onTransfertDeleted,
  }: TransfertsTableProps,
) {
  const { messages } = useMessages();
  const transfertsService: TransfertsService = getGlobalInstance(TransfertsService);

  // State for tracking which transfert is being edited
  const [transfertToEdit, setTransfertToEdit] = useState<TransfertResponse | null>(null);

  // State for deletion confirmation
  const [transfertToDelete, setTransfertToDelete] = useState<TransfertResponse | null>(null);

  // Handle edit click
  const handleEditClick = (transfert: TransfertResponse) => {
    setTransfertToEdit(transfert);
  };

  // Handle modal close
  const handleModalClose = () => {
    setTransfertToEdit(null);
    onTransfertDeleted(); // Refresh the list after edit
  };

  // Handle delete click
  const handleDeleteClick = (transfert: TransfertResponse) => {
    setTransfertToDelete(transfert);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (transfertToDelete) {
      transfertsService.deleteTransfert(transfertToDelete.id)
        .then(() => {
          // Close modal and refresh data
          setTransfertToDelete(null);
          onTransfertDeleted();
        });
    }
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setTransfertToDelete(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              {messages.operations.transferts.table.date}
            </TableHead>
            <TableHead className="w-[100px] text-right">
              {messages.operations.transferts.table.amount}
            </TableHead>
            <TableHead>
              {messages.operations.transferts.table.fromAccountName}
            </TableHead>
            <TableHead>
              {messages.operations.transferts.table.toAccountName}
            </TableHead>
            <TableHead className="text-right">
              {messages.operations.transferts.table.action}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            transferts.map((transfert: TransfertResponse) => (
              <TableRow key={transfert.id}>
                <TableCell>
                  {formatToLocalDateOrPlaceholder(transfert.date)}
                </TableCell>
                <TableCell className={'text-right'}>
                  {formatEuroDecimalPriceFromString(transfert.amount)}
                </TableCell>
                <TableCell>
                  <p className="font-bold" style={{ color: `#${transfert.fromAccountColor}` }}>
                    {transfert.fromAccountName}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-bold" style={{ color: `#${transfert.toAccountColor}` }}>
                    {transfert.toAccountName}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleEditClick(transfert)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="text-red-500 hover:text-red-600 hover:border-red-200"
                      onClick={() => handleDeleteClick(transfert)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      {/* Edit Modal */}
      {isNotNullish(transfertToEdit) && (
        <UpdateTransfertFormModal
          isOpen={isNotNullish(transfertToEdit)}
          onCancel={handleModalClose}
          transfert={transfertToEdit}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isNotNullish(transfertToDelete)}
        title={messages.operations.transferts.delete.confirmTitle}
        description={messages.operations.transferts.delete.confirmDescription}
        onCancel={handleCancelDelete}
        onValidate={handleConfirmDelete}
        validateVariant="destructive"
      />
    </>
  );
}
