import { Currency } from "@/types";
import { formatValueByCurrency } from "@/utils/currency";

export default function CurrencySpan({ value, currency }: { value: number, currency: Currency }) {
    return (
        <span>{currency} {formatValueByCurrency(value, currency)}</span>
    );
}