import { Button } from '@/lib/shadcn/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/lib/shadcn/command';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/lib/shadcn/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/shadcn/popover';
import { cn } from '@/lib/shadcn/utils';
import useMessages from '@i18n/hooks/messagesHook';
import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';

export type Choice = {
  value: string,
  label: string,
};

type UncontrolledSelect = {
  label: string,
  choices: Choice[],
  value?: string,
  setValue: (value: string) => void,
};

export default function UncontrolledSelect(
  {
    choices,
    label,
    value,
    setValue,
  }: UncontrolledSelect,
) {
  const { messages } = useMessages();

  return (
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
                    !value && 'text-muted-foreground',
                  )}
              >
                <span>
                  {
                    value
                      ? choices.find((choice: Choice) => choice.value === value)?.label
                      : label
                  }
                </span>
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
                            choice.value === value
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
  );
}
