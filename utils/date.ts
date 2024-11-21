import { parseISO, startOfToday } from "date-fns";

export const getStartOfToday = (): Date => startOfToday();

export const getNow = (): Date => new Date();

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export const parseDateString = (dts: string): Date => parseISO(dts);
