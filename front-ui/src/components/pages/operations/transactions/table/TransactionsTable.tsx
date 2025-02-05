import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/lib/shadcn/table';
import { TransactionResponse } from '@api/transactions/TransactionsTypes';
import useMessages from '@i18n/hooks/messagesHook';
import { Button } from '@lib/shadcn/button';
import { Pencil } from 'lucide-react';
import React from 'react';

type CategoriesTableProps = {
  transactions: TransactionResponse[],
};

export default function TransactionsTable({ transactions }: CategoriesTableProps) {
  const { messages } = useMessages();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            {messages.operations.transactions.table.date}
          </TableHead>
          <TableHead>
            {messages.operations.transactions.table.inBankDate}
          </TableHead>
          <TableHead>
            {messages.operations.transactions.table.amount}
          </TableHead>
          <TableHead>
            {messages.operations.transactions.table.accountName}
          </TableHead>
          <TableHead>
            {messages.operations.transactions.table.categoryName}
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
          <TableHead>
            {messages.operations.transactions.table.side}
          </TableHead>
          <TableHead>
            {messages.operations.transactions.table.fromToPersonName}
          </TableHead>
          <TableHead className="text-right">
            {messages.operations.transactions.table.action}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          transactions.map((category: TransactionResponse) => (
            <TableRow key={category.id}>
              <TableCell>{category.date}</TableCell>
              <TableCell>{category.inBankDate}</TableCell>
              <TableCell>{category.amount}</TableCell>
              <TableCell>{category.accountName}</TableCell>
              <TableCell>{category.categoryName}</TableCell>
              <TableCell>{category.subCategoryName}</TableCell>
              <TableCell>{category.comment}</TableCell>
              <TableCell>{category.tag}</TableCell>
              <TableCell>{category.side}</TableCell>
              <TableCell>{category.fromToPersonName}</TableCell>
              <TableCell className="text-right">
                <Button type="button" variant="outline">
                  <Pencil />
                </Button>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}
