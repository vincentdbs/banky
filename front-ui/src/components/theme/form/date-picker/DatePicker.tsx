import { Button } from '@/lib/shadcn/button';
import { Calendar } from '@/lib/shadcn/calendar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/shadcn/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/lib/shadcn/popover';
import { cn } from '@/lib/shadcn/utils';
import { formatToLocaleDate } from '@/utils/dates/DatesUtils';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

type DatePickerProps<T extends FieldValues> = {
  control: Control<T>,
  name: Path<T>,
  label: string,
}
export default function DatePicker<T extends FieldValues>(
  {
    control,
    name,
    label,
  }: DatePickerProps<T>,
) {
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
                    className={
                      cn(
                        'w-full',
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )
                    }
                  >
                    {
                      field.value
                        ? (
                          formatToLocaleDate(field.value)
                        ) : (
                          <span>{label}</span>
                        )
                    }
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date?: Date) => {
                    if (!date) {
                      field.onChange(undefined);
                    } else {
                      field.onChange(dayjs(date));
                    }
                  }}
                  disabled={(date: Date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}