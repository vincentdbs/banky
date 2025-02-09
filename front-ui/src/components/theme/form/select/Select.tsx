import { Button } from '@/lib/shadcn/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/lib/shadcn/command';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/shadcn/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/shadcn/popover';
import { cn } from '@/lib/shadcn/utils';
import useMessages from '@i18n/hooks/messagesHook';
import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export type Choice = {
  value: string,
  label: string,
}

type SelectProps<T extends FieldValues> = {
  control: Control<T>,
  name: Path<T>,
  label: string,
  choices: Choice[],
  setValue: (value: string) => void,
}

export default function Select<T extends FieldValues>(
  {
    control,
    name,
    choices,
    label,
    setValue,
  }: SelectProps<T>,
) {
  const { messages } = useMessages();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="w-full">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={
                      cn(
                        'w-full',
                        'justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                  >
                    {
                      field.value
                        ? choices.find((choice: Choice) => choice.value === field.value)?.label
                        : label
                    }
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput
                    placeholder={messages.action.search}
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>{messages.error.unknownChoice}</CommandEmpty>
                    <CommandGroup>
                      {choices.map((choice: Choice) => (
                        <CommandItem
                          value={choice.label}
                          key={choice.value}
                          onSelect={() => {
                            setValue(choice.value);
                          }}
                        >
                          {choice.label}
                          <Check
                            className={
                              cn(
                                'ml-auto',
                                choice.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )
                            }
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}