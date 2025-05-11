import dayjs, { Dayjs } from 'dayjs';

export const formatToLocaleDate = (date: Dayjs | string): string => dayjs(date).format('DD/MM/YYYY');

export const formatToIsoDate = (date: Dayjs | string): string => dayjs(date).format('YYYY-MM-DD');

export const formatToLocalDateOrPlaceholder = (date?: Dayjs | string): string => (
  date ? formatToLocaleDate(date) : '-'
);

export const computeFirstDayOfTheYear = (year: number): Dayjs => {
  return dayjs(`${year}-01-01`);
}

export const getMonthName = (month: string): string => {
  return dayjs(month).format('MMMM');
}