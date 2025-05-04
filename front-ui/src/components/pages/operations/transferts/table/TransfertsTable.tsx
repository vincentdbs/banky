import React from 'react';
import { TransfertResponse } from '@api/transferts/TransfertTypes';
import useMessages from '@i18n/hooks/messagesHook';
import { Button } from '@lib/shadcn/button';
import { Pencil } from 'lucide-react';
import {
  formatEuroDecimalPrice,
  formatEuroDecimalPriceFromString,
} from '@/utils/number/NumberUtils';
import { formatToLocalDateOrPlaceholder } from '@/utils/dates/DatesUtils';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/lib/shadcn/table';

type TransfertsTableProps = {
  transferts: TransfertResponse[],
  onEditTransfert?: (transfert: TransfertResponse) => void,
};

/**
 * Displays a table of transferts between accounts
 */
export default function TransfertsTable({ transferts, onEditTransfert }: TransfertsTableProps) {
  const { messages } = useMessages();

  return (
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
                {onEditTransfert && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => onEditTransfert(transfert)}
                  >
                    <Pencil />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}