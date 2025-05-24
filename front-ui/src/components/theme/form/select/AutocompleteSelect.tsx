import AutocompleteUncontrolledSelect, { Choice } from '@components/theme/form/select/AutocompleteUncontrolledSelect';
import React from 'react';
import {
  Control, ControllerRenderProps, FieldValues, Path,
} from 'react-hook-form';
import { FormField } from '@/lib/shadcn/form';

type AutocompleteSelectProps<T extends FieldValues> = {
  control: Control<T>,
  name: Path<T>,
  label: string,
  choices: Choice[],
};

export default function AutocompleteSelect<T extends FieldValues>(
  {
    control,
    name,
    choices,
    label,
  }: AutocompleteSelectProps<T>,
) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<T> }) => (
        <AutocompleteUncontrolledSelect
          label={label}
          choices={choices}
          setValue={field.onChange}
          value={field.value}
        />
      )}
    />
  );
}
