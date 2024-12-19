"use client";
import { useFetchTransactionMetricsByPeriod } from "@/hooks/useFetchMetricsByPeriod";
import { MetricsByPeriod, TransactionMetricsByPeriodResponse } from "@/models";
import { DateRange, TimePeriod, } from "@/types";
import { startOfMonth, endOfMonth, format, formatDate, parseISO, startOfYear, subMonths } from "date-fns";
import { useState } from "react";
import { Bar, BarChart as BC, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ColorGenerator } from "hex-color-randomizer";
import { Card, CardBody, CardHeader, Chip, Divider, Spinner } from "@nextui-org/react";
import clsx from "clsx";

const colors = ColorGenerator.generateRandomHexColorsArray(2)
const renderBarChart = (metrics: MetricsByPeriod[]) =>
    <ResponsiveContainer width="100%" height={130}>
        <BC data={metrics} margin={{ left: 0, right: 10 }}>
            <XAxis dataKey="period_start" />
            <Tooltip />
            <Bar dataKey="total" fill={colors[0]} />
        </BC>
    </ResponsiveContainer>
const setDefaultRange = (period: TimePeriod) => {
    const prepare = (date: Date) => format(date, "yyyy-MM-dd")
    let now = new Date();
    let start = startOfYear(now);
    switch (period) {
        case "daily":
            start = startOfMonth(now);
            break;
        case "weekly":
            start = subMonths(now, 2)
        default:
            break;
    }
    return { start: prepare(start), end: prepare(now) }
}

export default function TotalFromTransactionsOverTimeChart({ leftCornerContent, period, currency }: { leftCornerContent?: React.ReactNode, period: TimePeriod, currency: string }) {
    const [selectedRange, setSelectedRange] = useState<{
        start: string;
        end: string;
    }>(setDefaultRange(period));
    const { metrics, isLoading, error, mutate } = useFetchTransactionMetricsByPeriod(selectedRange.start, selectedRange.end, period, currency)
    let content: MetricsByPeriod[] = metrics?.data?.item ?? []
    const cardStyles = clsx("shadow-none")

    if (!isLoading && content.length > 0) {
        content = content.map((item: MetricsByPeriod) => ({ ...item, period_start: formatDate(parseISO(item.period_start), "MMM d") }));
        return renderBarChart(content);
    }

    return (
        <div className="flex items-center justify-center" style={{ width: "100%", height: "100px" }}>
            <Spinner size="lg" />
        </div>
    );
}