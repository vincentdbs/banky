import { CategoryResponse } from '@api/categories/CategoriesTypes';
import ParametersLayout from '@components/layout/parameters/ParametersLayout';
import CategoriesTable from '@components/pages/parameters/categories/table/CategoriesTable';
import useMessages from '@i18n/hooks/messagesHook';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import CategoriesService from '@services/categories/CategoriesService';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';

export default function Categories() {
  const categoriesService: CategoriesService = getGlobalInstance(CategoriesService);

  const { messages, httpError } = useMessages();
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  useOnComponentMounted(() => {
    categoriesService
      .fetchCategories()
      .then(setCategories)
      .catch(httpError);
  });

  return (
    <ParametersLayout
      title={messages.parameters.categories.title}
      subTitle={messages.parameters.categories.subTitle}
    >
      <CategoriesTable categories={categories} />
    </ParametersLayout>
  );
}
