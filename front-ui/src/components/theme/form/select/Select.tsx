import UncontrolledSelect, { Choice } from '@components/theme/form/select/UncontrolledSelect';
import React from 'react';
import {
  Control, ControllerRenderProps, FieldValues, Path,
} from 'react-hook-form';
import { FormField } from '@/lib/shadcn/form';

type SelectProps<T extends FieldValues> = {
  control: Control<T>,
  name: Path<T>,
  label: string,
  choices: Choice[],
};

export default function Select<T extends FieldValues>(
  {
    control,
    name,
    choices,
    label,
  }: SelectProps<T>,
) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<T> }) => (
        <UncontrolledSelect
          label={label}
          choices={choices}
          setValue={field.onChange}
          value={field.value}
        />
      )}
    />
  );
}
