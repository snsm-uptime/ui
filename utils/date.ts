import {DateRange, TimePeriod} from "@/types";
import {
  format,
  parseISO,
  startOfMonth,
  startOfTomorrow,
  startOfWeek,
  startOfYear,
} from "date-fns";
import {} from "date-fns";

export const getNow = (): Date => new Date();

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export const parseDateString = (dts: string): Date => parseISO(dts);

export function getDateRange(period: TimePeriod): DateRange {
  const today = new Date();
  const tomorrow = startOfTomorrow();

  switch (period) {
    case "daily":
      return {
        start: format(today, "yyyy-MM-dd"),
        end: format(tomorrow, "yyyy-MM-dd"),
      };
    case "weekly":
      return {
        start: format(startOfWeek(today), "yyyy-MM-dd"),
        end: format(tomorrow, "yyyy-MM-dd"),
      };
    case "monthly":
      return {
        start: format(startOfMonth(today), "yyyy-MM-dd"),
        end: format(tomorrow, "yyyy-MM-dd"),
      };
    case "yearly":
      return {
        start: format(startOfYear(today), "yyyy-MM-dd"),
        end: format(tomorrow, "yyyy-MM-dd"),
      };
    default:
      throw new Error(`Unsupported TimePeriod: ${period}`);
  }
}
