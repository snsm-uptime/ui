import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FetchOption = "month" | "today" | "custom";

export enum Currency {
  USD = "USD", // United States Dollar
  CRC = "CRC", // Costa Rican Colón
}

export type TimePeriod = "daily" | "weekly" | "monthly";

export type DateRange = { start: string; end: string };
