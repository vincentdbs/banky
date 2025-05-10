import { TransactionResponse } from '@api/transactions/TransactionsTypes';
import TransactionsSideIcon from '@components/theme/icons/transactions-side/TransactionSideIcon';
import useMessages from '@i18n/hooks/messagesHook';
import { Button } from '@lib/shadcn/button';
import { Pencil } from 'lucide-react';
import React from 'react';
import { formatEuroDecimalPrice } from '@utils/number/NumberUtils';
import { formatToLocalDateOrPlaceholder } from '@utils/dates/DatesUtils';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/lib/shadcn/table';

type CategoriesTableProps = {
  transactions: TransactionResponse[],
};

export default function TransactionsTable({ transactions }: CategoriesTableProps) {
  const { messages } = useMessages();

  return (
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
