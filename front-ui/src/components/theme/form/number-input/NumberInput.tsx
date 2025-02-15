import { Input } from '@lib/shadcn/input';
import React, { ChangeEvent } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/lib/shadcn/form';

type NumberInputProps<T extends FieldValues> = {
  control: Control<T>,
  name: Path<T>,
  label: string,
  step?: number,
  min?: number,
  max?: number,
  displayEuro?: boolean,
};
export default function NumberInput<T extends FieldValues>(
  {
    control,
    name,
    label,
    step,
    min,
    max,
    displayEuro = false,
  }: NumberInputProps<T>,
) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={min}
                max={max}
                step={step}
                placeholder={label}
                {...field}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (!e.target.value) {
                    field.onChange(undefined);
                    return;
                  }
                  field.onChange(parseFloat(e.target.value));
                }}
              />
              {
                displayEuro
                && (
                  <p>{'€'}</p>
                )
              }
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
