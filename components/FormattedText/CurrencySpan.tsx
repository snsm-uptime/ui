import { Currency } from "@/types";
import { formatValueByCurrency } from "@/utils/currency";

export default function CurrecySpan({ value, currency }: { value: number, currency: Currency }) {
    const emoji = currency == Currency.CRC ? "🇨🇷" : "🇺🇸";
    return (
        <span>{emoji} {currency} {formatValueByCurrency(value, currency)}</span>
    );
}