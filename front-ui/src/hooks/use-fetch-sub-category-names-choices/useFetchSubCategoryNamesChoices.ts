import { SubCategoryNamesResponse } from '@api/categories/CategoriesTypes';
import { Choice } from '@components/theme/form/select/Select';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import CategoriesService from '@services/categories/CategoriesService';
import { getGlobalInstance } from 'plume-ts-di';
import { useState } from 'react';

type UseFetchSubCategoryNamesChoices = {
  choices: Choice[],
};

export default function useFetchSubCategoryNamesChoices(): UseFetchSubCategoryNamesChoices {
  const categoriesService: CategoriesService = getGlobalInstance(CategoriesService);

  const [subcategoryNameChoices, setSubcategoryNameChoices] = useState<Choice[]>([]);

  useOnComponentMounted(() => {
    categoriesService.fetchSubCategoryNames()
      .then((names: SubCategoryNamesResponse[]) => setSubcategoryNameChoices(
        names.map((name: SubCategoryNamesResponse) => (
          {
            label: name.name,
            value: name.id,
          }
        )),
      ));
  });

  return { choices: subcategoryNameChoices };
}
