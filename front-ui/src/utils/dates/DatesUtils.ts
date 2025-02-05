import dayjs, { Dayjs } from 'dayjs';

export const formatToLocaleDate = (date: Dayjs | string): string => {
  return dayjs(date).format('DD/MM/YYYY');
}

export const formatToLocalDateOrPlaceholder = (date?: Dayjs | string): string => {
  return date ? formatToLocaleDate(date) : '-';
}