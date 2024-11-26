import { useFetchTransactionMetricsByPeriod } from "@/hooks/useFetchMetricsByPeriod";
import { Currency, DateRange, TimePeriod } from "@/types";
import clsx from "clsx";
import { format, formatDate } from "date-fns";
import { PureComponent } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type RawDataItem = {
    period_start: string;
    currency: string;
    total: number;
};

type ProcessedDataItem = {
    period_start: string;
    CRC?: number;
    USD?: number;
    [key: string]: number | string | undefined;
};

export default function CurrencyExpensesByPeriodChart({ date_range, period, currency }: { date_range: DateRange, period: TimePeriod, currency: Currency }) {
    const { data, isLoading, error, mutate } = useFetchTransactionMetricsByPeriod(date_range.start, date_range.end, period, currency)
    let content = data?.data?.item
    if (content) {
        const sid = `${period}${date_range.start}_${date_range.end}`
        return <div>
            <h1>Total expenses in {currency}</h1>
            <AreaChart
                width={900}
                height={300}
                data={content}
                syncId={sid}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis hide dataKey="period_start" />

            </AreaChart>
        </div>
    }
    else {
        return "NO DATA"
    };
}