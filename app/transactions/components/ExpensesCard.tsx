import CurrecySpan from "@/components/FormattedText/CurrencySpan";
import TableDetailCard from "@/components/Table/TableDetailCard";
import { useCalculateExpenses } from "@/hooks/useCalculateExpenses";
import { Currency, DateRange, TimePeriod } from "@/types";
import { getDateRange, parseDateString } from "@/utils/date";
import { isToday, isThisWeek, isThisMonth, format, startOfWeek, endOfWeek } from "date-fns";



export default function ExpensesCard({ title, totalCRC, totalUSD }: { title: string, totalCRC: number, totalUSD: number }) {
    return (
        <TableDetailCard
            className="min-w-48"
            title={title}
        >
            <div className="flex flex-col">
                <CurrecySpan value={totalCRC} currency={Currency.CRC} />
                <CurrecySpan value={totalUSD} currency={Currency.USD} />
            </div>
        </TableDetailCard>
    );
}