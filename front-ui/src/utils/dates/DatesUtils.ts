import dayjs, { Dayjs } from 'dayjs';

export const formatToLocaleDate = (date: Dayjs | string): string => dayjs(date).format('DD/MM/YYYY');

export const formatToIsoDate = (date: Dayjs | string): string => dayjs(date).format('YYYY-MM-DD');

export const formatToLocalDateOrPlaceholder = (date?: Dayjs | string): string => (
  date ? formatToLocaleDate(date) : '-'
);

export const getMonthNameByIndex = (monthIndex: number): string => {
  const date = dayjs().month(monthIndex);
  return date.format('MMMM');
}