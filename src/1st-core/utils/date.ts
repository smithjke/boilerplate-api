import format from 'date-fns/format';
import { enUS } from 'date-fns/locale';

export function dateFormatBase(date: Date): string {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
}

export function dateFormatHuman(date: Date): string {
  // return format(date, 'PPpp', { locale: ru });
  return format(date, 'HH:mm – dd.MM.yyyy', { locale: enUS });
}
