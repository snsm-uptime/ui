import CurrecySpan from "@/components/FormattedText/CurrencySpan";
import TableDetailCard from "@/components/Table/TableDetailCard";
import { Transaction } from "@/models";
import { Currency } from "@/types";
import { parseDateString } from "@/utils/date";
import { isToday, isThisWeek, isThisMonth, format, startOfWeek, endOfWeek } from "date-fns";

type TimePeriod = "daily" | "weekly" | "monthly";


interface ExpensesCardProps {
    transactions: Transaction[];
    period: TimePeriod;
}

const periodConfig: Record<
    TimePeriod,
    { filter: (date: Date) => boolean; title: string; }
> = {
    daily: {
        filter: isToday,
        title: "Today's Expenses",
    },
    weekly: {
        filter: isThisWeek,
        title: `This Week's Expenses (${format(startOfWeek(new Date()), "MMM d")} - ${format(
            endOfWeek(new Date()),
            "MMM d"
        )})`,
    },
    monthly: {
        filter: isThisMonth,
        title: `Expenses for ${format(new Date(), "MMMM")}`,
    },
};

export default function ExpensesCard({ transactions, period }: ExpensesCardProps) {
    const { filter, title } = periodConfig[period];

    const filteredTransactions = transactions.filter((transaction) =>
        filter(parseDateString(transaction.date))
    );

    const calculateTotals = (currency: Currency) =>
        filteredTransactions
            .filter((transaction) => transaction.currency === currency)
            .reduce((sum, transaction) => sum + transaction.value, 0);

    const totalCRC = calculateTotals(Currency.CRC);
    const totalUSD = calculateTotals(Currency.USD);

    return (
        <TableDetailCard
            className="h-fit min-w-48"
            title={title}
            subtitle={`${filteredTransactions.length} Items`}
        >
            <div className="flex flex-col">
                <CurrecySpan value={totalCRC} currency={Currency.CRC} />
                <CurrecySpan value={totalUSD} currency={Currency.USD} />
            </div>
        </TableDetailCard>
    );
}