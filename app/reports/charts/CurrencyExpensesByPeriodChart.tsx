import { useFetchTransactionMetricsByPeriod } from "@/hooks/useFetchMetricsByPeriod";
import { Currency, DateRange, TimePeriod } from "@/types";
import { format, parseISO } from "date-fns";
import { MetricsByPeriod } from "@/models";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from "recharts";


export default function CurrencyExpensesByPeriodChart({ date_range, period, currency }: { date_range: DateRange, period: TimePeriod, currency: Currency }) {
    const { metrics, isLoading, error, mutate } = useFetchTransactionMetricsByPeriod(date_range.start, date_range.end, period, currency)
    let content: MetricsByPeriod[] = metrics?.data?.item ?? []
    if (!isLoading && content.length > 0) {
        content = content.map((item) => ({ ...item, period_start: format(parseISO(item.period_start), "MMM d") }))
        const sid = `${period}${date_range.start}_${date_range.end}`
        return <div>
            <h1>Total expenses in {currency}</h1>
            <ComposedChart
                width={500}
                height={200}
                data={content}
                syncId={sid}>
                <CartesianGrid strokeDasharray="5 5" />
                <Tooltip contentStyle={{ background: "var(--bg-z0)" }} />
                <Legend />
                <YAxis />
                <XAxis dataKey="period_start" hide={period == "daily"} />
                <Line dataKey="max_value" stroke={colors[0]} fill={colors[0]} />
                <Line dataKey="avg_transaction" stroke={colors[1]} fill={colors[1]} />


            </ComposedChart>
        </div>
    }
    else {
        return "NO DATA"
    };
}