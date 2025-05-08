import { TickerResponse } from '@api/tickers/TickersTypes';
import useMessages from '@i18n/hooks/messagesHook';
import { Badge } from '@lib/shadcn/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@lib/shadcn/table';
import React from 'react';
import { computeBadgeVariantByTickerCategory } from '@/utils/badge/BadgeUtils';

type TickersTableProps = {
  tickers: TickerResponse[],
};

/**
 * Table component to display the list of tickers with their details
 */
export default function TickersTable({ tickers }: TickersTableProps) {
  const { messages } = useMessages();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{messages.parameters.tickers.table.name}</TableHead>
          <TableHead>{messages.parameters.tickers.table.shortName}</TableHead>
          <TableHead>{messages.parameters.tickers.table.category}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickers.map((ticker) => (
          <TableRow key={ticker.id}>
            <TableCell>{ticker.name}</TableCell>
            <TableCell>{ticker.shortName}</TableCell>
            <TableCell>
              <Badge variant={computeBadgeVariantByTickerCategory(ticker.category)}>
                {messages.message.tickerCategory[ticker.category]}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
