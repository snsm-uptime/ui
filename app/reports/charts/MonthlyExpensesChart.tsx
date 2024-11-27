import { useFetchTransactionMetricsByPeriod } from "@/hooks/useFetchMetricsByPeriod";
import { Currency, DateRange, TimePeriod } from "@/types";
import { format, parseISO } from "date-fns";



export default function MonthlyExpensesChart({ date_range, period, currency }: { date_range: DateRange, period: TimePeriod, currency: Currency }) {
    const { metrics, isLoading, error, mutate } = useFetchTransactionMetricsByPeriod(date_range.start, date_range.end, period, currency)
    let content = metrics?.data?.item
    if (content) {
        content = content.map((item) => ({ ...item, period_start: format(parseISO(item.period_start), "MMM d") }))
    }
    return (
        <div>
        </div>
    );
}