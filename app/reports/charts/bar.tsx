import { useFetchTransactionMetricsByPeriod } from "@/hooks/useFetchMetricsByPeriod";
import { Currency, DateRange, TimePeriod } from "@/types";
import clsx from "clsx";
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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

function processData(rawData: RawDataItem[]): ProcessedDataItem[] {
    const groupedData: Record<string, ProcessedDataItem> = {};

    rawData.forEach((item) => {
        const date = item.period_start;
        if (!groupedData[date]) {
            groupedData[date] = { period_start: date };
        }
        groupedData[date][item.currency] = item.total;
    });

    return Object.values(groupedData);
}

export default function BarChart({ date_range, period }: { date_range: DateRange, period: TimePeriod }) {
    const { data, isLoading, error, mutate } = useFetchTransactionMetricsByPeriod(date_range.start, date_range.end, period)
    let content = data?.data?.item
    const processedData = (rawData: RawDataItem[]) => {
        const groupedData: any = {};
        rawData.forEach((item) => {
            const date = item.period_start;
            if (!groupedData[date]) {
                groupedData[date] = { period_start: date };
            }
            groupedData[date][item.currency] = item.total;
        });
        return Object.values(groupedData);
    };
    if (content) {
        const pd = processedData(content!)
        console.table(pd);
        const sid = `${period}${date_range.start}_${date_range.end}`
        return <div>
            {
                Object.values(Currency).map((currency) => (
                    <div>
                        <h1>Total expenses in {currency}</h1>
                        <AreaChart
                            width={900}
                            height={300}
                            data={pd}
                            syncId={sid}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis hide dataKey="period_start" />
                            <YAxis />
                            <Tooltip contentStyle={{ background: "rgba(55,55,55,0.9)" }} />
                            <Area
                                dataKey={currency}
                                type="monotone"
                                fill="#8884d8"
                                stroke="#8884d8"
                            />
                        </AreaChart>
                    </div>
                ))
            }
        </div>
    }
    else {
        return "NO DATA"
    };
}