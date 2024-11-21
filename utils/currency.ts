import { Currency } from "@/types";

export const formatValueByCurrency = (
  value: number,
  currency: Currency
): string => {
  const locale = currency === "CRC" ? "es-CR" : "en-US"; // Use es-CR for colones, en-US for USD

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });

  return formatter.format(value);
};
