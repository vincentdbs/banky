import { FormField } from '@/lib/shadcn/form';
import UncontrolledSelect, { Choice } from '@components/theme/form/select/UncontrolledSelect';
import React from 'react';
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

type SelectProps<T extends FieldValues> = {
  control: Control<T>,
  name: Path<T>,
  label: string,
  choices: Choice[],
  setValue: (value: string) => void,
};

export default function Select<T extends FieldValues>(
  {
    control,
    name,
    choices,
    label,
    setValue,
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
          setValue={setValue}
          value={field.value}
        />
      )}
    />
  );
}
