import CurrencySpan from "@/components/FormattedText/CurrencySpan";
import TableDetailCard from "@/components/Table/TableDetailCard";
import { Currency } from "@/types";



export default function ExpensesCard({ title, totalCRC, totalUSD }: { title: string, totalCRC: number, totalUSD: number }) {
    return (
        <TableDetailCard
            className="min-w-48"
            title={title}
        >
            <div className="flex flex-col">
                <CurrencySpan value={totalCRC} currency={Currency.CRC} />
                <CurrencySpan value={totalUSD} currency={Currency.USD} />
            </div>
        </TableDetailCard>
    );
}