import { TransactionResponse } from '@api/transactions/TransactionsTypes';
import TransactionsSideIcon from '@components/theme/icons/transactions-side/TransactionSideIcon';
import ConfirmationModal from '@components/theme/modal/ConfirmationModal';
import useMessages from '@i18n/hooks/messagesHook';
import { Button } from '@lib/shadcn/button';
import TransactionsService from '@services/transactions/TransactionsService';
import { formatToLocalDateOrPlaceholder } from '@utils/dates/DatesUtils';
import { formatEuroDecimalPrice } from '@utils/number/NumberUtils';
import { isNotNullish } from '@utils/types/TypesUtils';
import { Pencil, Trash2 } from 'lucide-react';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/lib/shadcn/table';
import UpdateTransactionFormModal from '../modal/UpdateTransactionFormModal';

type CategoriesTableProps = {
  transactions: TransactionResponse[],
  onTransactionDeleted: () => void,
};

export default function TransactionsTable(
  {
    transactions,
    onTransactionDeleted,
  }: CategoriesTableProps,
) {
  const { messages } = useMessages();
  const transactionsService: TransactionsService = getGlobalInstance(TransactionsService);

  // State for managing the edit modal
  const [transactionToEdit, setTransactionToEdit] = useState<TransactionResponse | null>(null);

  // State for managing the delete confirmation modal
  const [transactionToDelete, setTransactionToDelete] = useState<TransactionResponse | null>(null);

  // Handler for edit button click
  const handleEditClick = (transaction: TransactionResponse) => {
    setTransactionToEdit(transaction);
  };

  // Handler for modal close
  const handleModalClose = () => {
    setTransactionToEdit(null);
  };

  // Handler for delete button click
  const handleDeleteClick = (transaction: TransactionResponse) => {
    setTransactionToDelete(transaction);
  };

  // Handler for delete cancellation
  const handleDeleteCancel = () => {
    setTransactionToDelete(null);
  };

  // Handler for delete confirmation
  const handleDeleteConfirm = () => {
    if (transactionToDelete) {
      transactionsService.deleteTransaction(transactionToDelete.id)
        .then(() => {
          setTransactionToDelete(null);
          onTransactionDeleted();
        });
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">
              {messages.operations.transactions.table.date}
            </TableHead>
            <TableHead className="w-[70px]">
              {messages.operations.transactions.table.amount}
            </TableHead>
            <TableHead>
              {messages.operations.transactions.table.accountName}
            </TableHead>
            <TableHead>
              {messages.operations.transactions.table.fromToPersonName}
            </TableHead>
            <TableHead>
              {messages.operations.transactions.table.subCategoryName}
            </TableHead>
            <TableHead>
              {messages.operations.transactions.table.comment}
            </TableHead>
            <TableHead>
              {messages.operations.transactions.table.tag}
            </TableHead>
            <TableHead className="text-right">
              {messages.operations.transactions.table.action}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            transactions.map((transaction: TransactionResponse) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className={'flex items-center gap-2'}>
                    <TransactionsSideIcon side={transaction.side} />
                    <div>
                      <p>
                        {formatToLocalDateOrPlaceholder(transaction.date)}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatToLocalDateOrPlaceholder(transaction.inBankDate)}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className={'text-right'}>
                  {formatEuroDecimalPrice(transaction.amount)}
                </TableCell>
                <TableCell>
                  <p className="font-bold" style={{ color: `#${transaction.accountColor}` }}>
                    {transaction.accountName}
                  </p>
                </TableCell>
                <TableCell>{transaction.fromToPersonName}</TableCell>
                <TableCell>{transaction.subCategoryName}</TableCell>
                <TableCell>{transaction.comment}</TableCell>
                <TableCell>{transaction.tag}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleEditClick(transaction)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteClick(transaction)}
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
      {
        isNotNullish(transactionToEdit)
        && (
          <UpdateTransactionFormModal
            isOpen={isNotNullish(transactionToEdit)}
            onCancel={handleModalClose}
            transaction={transactionToEdit}
          />
        )
      }
      {
        isNotNullish(transactionToDelete)
        && (
          <ConfirmationModal
            isOpen={isNotNullish(transactionToDelete)}
            title={messages.operations.transactions.deleteModal.title}
            description={messages.operations.transactions.deleteModal.description}
            onCancel={handleDeleteCancel}
            onValidate={handleDeleteConfirm}
            validateVariant="destructive"
            validateText={messages.operations.transactions.deleteModal.confirmButton}
            cancelText={messages.operations.transactions.deleteModal.cancelButton}
          />
        )
      }
    </>
  );
}
