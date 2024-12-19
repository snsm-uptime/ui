import {ReactNode, SVGProps} from "react";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";

export type DateRange = {start: string; end: string};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FetchOption = "month" | "today" | "custom";

export type TimePeriod = "daily" | "weekly" | "monthly" | "yearly";
interface TimePeriodConfig {
  label: string;
  getRange: () => DateRange;
}

export const TimePeriodOptions: Record<TimePeriod, TimePeriodConfig> = {
  daily: {
    label: "Today",
    getRange: () => ({
      start: format(startOfDay(new Date()), "yyyy-MM-dd"),
      end: format(endOfDay(new Date()), "yyyy-MM-dd"),
    }),
  },
  weekly: {
    label: "This Week",
    getRange: () => ({
      start: format(startOfWeek(new Date()), "yyyy-MM-dd"),
      end: format(endOfWeek(new Date()), "yyyy-MM-dd"),
    }),
  },
  monthly: {
    label: "This Month",
    getRange: () => ({
      start: format(startOfMonth(new Date()), "yyyy-MM-dd"),
      end: format(endOfMonth(new Date()), "yyyy-MM-dd"),
    }),
  },
  yearly: {
    label: "This Year",
    getRange: () => ({
      start: format(startOfYear(new Date()), "yyyy-MM-dd"),
      end: format(endOfYear(new Date()), "yyyy-MM-dd"),
    }),
  },
};

export interface CardContent {
  header: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
}
