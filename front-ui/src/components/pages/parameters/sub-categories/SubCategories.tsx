import { SubCategoryResponse } from '@api/categories/CategoriesTypes';
import ParametersLayout from '@components/layout/parameters/ParametersLayout';
import useMessages from '@i18n/hooks/messagesHook';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import CategoriesService from '@services/categories/CategoriesService';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import SubCategoriesTable from './table/SubCategoriesTable';

export default function SubCategories() {
  const categoriesService: CategoriesService = getGlobalInstance(CategoriesService);

  const { messages, httpError } = useMessages();
  const [subCategories, setSubCategories] = useState<SubCategoryResponse[]>([]);

  useOnComponentMounted(() => {
    categoriesService
      .fetchSubCategories()
      .then(setSubCategories)
      .catch(httpError);
  });

  return (
    <ParametersLayout
      title={messages.parameters.subCategories.title}
      subTitle={messages.parameters.subCategories.subTitle}
    >
      <SubCategoriesTable subCategories={subCategories} />
    </ParametersLayout>
  );
}
