
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDatePtBr = (dateStr: string): string => {
  const date = parseISO(dateStr);
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

export const formatDateShortPtBr = (dateStr: string): string => {
  const date = parseISO(dateStr);
  return format(date, "dd/MM/yyyy", { locale: ptBR });
};

export const formatDateTimePtBr = (dateStr: string): string => {
  const date = parseISO(dateStr);
  return format(date, "dd 'de' MMMM, HH:mm", { locale: ptBR });
};

