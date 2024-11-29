import {ReactNode, SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FetchOption = "month" | "today" | "custom";

export enum Currency {
  USD = "USD", // United States Dollar
  CRC = "CRC", // Costa Rican Colón
  MXP = "MXP",
}

export type TimePeriod = "daily" | "weekly" | "monthly" | "yearly";

export type DateRange = {start: string; end: string};

export interface CardContent {
  header: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
}
