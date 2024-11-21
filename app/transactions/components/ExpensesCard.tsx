import CurrecySpan from "@/components/FormattedText/CurrencySpan";
import TableDetailCard from "@/components/Table/TableDetailCard";
import { Transaction } from "@/models";
import { Currency } from "@/types";
import { parseDateString } from "@/utils/date";
import { isToday } from "date-fns";

export default function ExpensesCard({ transactions }: { transactions: Transaction[] }) {
    const todayTransactions = transactions.filter(transaction => isToday(parseDateString(transaction.date)))
    const TodayTotal = (): React.ReactNode => {
        const crc = todayTransactions.filter(transaction => transaction.currency === "CRC")
        const usd = todayTransactions.filter(transaction => transaction.currency === "USD")
        let valCRC = crc.reduce((sum, transaction) => sum + transaction.value, 0);
        let valUSD = usd.reduce((sum, transaction) => sum + transaction.value, 0);

        return <div className="flex flex-row space-x-2">
            <CurrecySpan value={valCRC} currency={Currency.CRC} />
            <CurrecySpan value={valUSD} currency={Currency.USD} />
        </div>
    }
    return (
        <TableDetailCard className="h-fit min-w-48"
            title="Today's Expenses"
            subtitle={`${todayTransactions.length} Items Today`}
            children={<h4>{TodayTotal()}</h4>} />
    );
}