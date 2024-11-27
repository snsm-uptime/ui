"use client";
import { useFetchTransactionMetricsByPeriod } from "@/hooks/useFetchMetricsByPeriod";
import { MetricsByPeriod, TransactionMetricsByPeriodResponse } from "@/models";
import { DateRange, TimePeriod, Currency } from "@/types";
import { startOfMonth, endOfMonth, format, formatDate, parseISO, startOfYear, subMonths } from "date-fns";
import { useState } from "react";
import { Bar, BarChart as BC, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { ColorGenerator } from "hex-color-randomizer";
import { Card, CardBody, CardHeader, Chip, Divider, Spinner } from "@nextui-org/react";
import clsx from "clsx";

const colors = ColorGenerator.generateRandomHexColorsArray(2)
const renderBarChart = (metrics: MetricsByPeriod[], width: number, height: number) => <BC width={width} height={height} data={metrics} margin={{ left: 0, right: 10 }}>
    <XAxis dataKey="period_start" />
    {/* <YAxis /> */}
    <Tooltip />
    <Bar dataKey="total" fill={colors[0]} />

</BC>

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

export default function TotalFromTransactionsOverTimeChart({ leftCornerContent, period, currency }: { leftCornerContent: React.ReactNode, period: TimePeriod, currency: Currency }) {
    const [selectedRange, setSelectedRange] = useState<{
        start: string;
        end: string;
    }>(setDefaultRange(period));
    const { metrics, isLoading, error, mutate } = useFetchTransactionMetricsByPeriod(selectedRange.start, selectedRange.end, period, currency)
    let content: MetricsByPeriod[] = metrics?.data?.item ?? []
    const header = <CardHeader className="gap-2">{leftCornerContent}<span>Transactions</span><strong>{period.toUpperCase()}</strong></CardHeader>;
    const bodyWidth = 400;
    const cardStyles = clsx("shadow-none")

    if (!isLoading && content.length > 0) {
        content = content.map((item: MetricsByPeriod) => ({ ...item, period_start: formatDate(parseISO(item.period_start), "MMM d") }));
        return <Card className={cardStyles}>
            {header}
            <CardBody className="scrollbar-hide ">{renderBarChart(content, bodyWidth, bodyWidth / 3)}</CardBody>
        </Card >
    }

    return (
        <Card className={cardStyles}>
            {header}
            <CardBody>
                <div className="flex items-center justify-center" style={{ width: bodyWidth, height: bodyWidth / 3 }}>
                    <Spinner size="lg" />
                </div>
            </CardBody>
        </Card>
    );
}