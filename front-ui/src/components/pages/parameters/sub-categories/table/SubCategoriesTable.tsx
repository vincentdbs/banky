import { CategoryResponse, SubCategoryResponse } from '@api/categories/CategoriesTypes';
import useMessages from '@i18n/hooks/messagesHook';
import { Button } from '@lib/shadcn/button';
import { Pencil } from 'lucide-react';
import React from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/lib/shadcn/table';

type CategoriesTableProps = {
  subCategories: SubCategoryResponse[],
};

export default function SubCategoriesTable({ subCategories }: CategoriesTableProps) {
  const { messages } = useMessages();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead >
            {messages.parameters.subCategories.table.name}
          </TableHead>
          <TableHead >
            {messages.parameters.subCategories.table.categoryName}
          </TableHead>
          <TableHead className="text-right">
            {messages.parameters.subCategories.table.action}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          subCategories.map((subCategory: SubCategoryResponse) => (
            <TableRow key={subCategory.id}>
              <TableCell>{subCategory.name}</TableCell>
              <TableCell>{subCategory.category}</TableCell>
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
