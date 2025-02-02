import { CategoryResponse } from '@api/categories/CategoriesTypes';
import useMessages from '@i18n/hooks/messagesHook';
import { Button } from '@lib/shadcn/button';
import { Pencil } from 'lucide-react';
import React from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/lib/shadcn/table';

type CategoriesTableProps = {
  categories: CategoryResponse[],
};

export default function CategoriesTable({ categories }: CategoriesTableProps) {
  const { messages } = useMessages();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead >
            {messages.parameters.categories.table.name}
          </TableHead>
          <TableHead className="text-right">
            {messages.parameters.categories.table.action}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          categories.map((category: CategoryResponse) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
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
