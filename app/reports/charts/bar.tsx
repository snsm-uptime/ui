import { useFetchTransactionMetricsByPeriod } from "@/hooks/useFetchMetricsByPeriod";
import { Currency, DateRange, TimePeriod } from "@/types";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
        return <LineChart
            width={900}
            height={300}
            data={pd}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period_start" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.values(Currency).map((currency) => (
                <Line
                    key={currency}
                    type="monotone"
                    dataKey={currency}
                    activeDot={{ r: 8 }}
                />
            ))}
        </LineChart>
    }
    else {
        return "NO DATA"
    };
}