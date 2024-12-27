import ByPeriodCard from "@/components/Dashboard/Cards/ByPeriodCard";
import CardHeaderSwitch from "@/components/Generic/CardHeaderSwitch";
import { useCalculateExpenses } from "@/hooks/useCalculateExpenses";
import { useFetchTransactionMetricsByPeriod } from "@/hooks/useFetchMetricsByPeriod";
import { MetricsByPeriod } from "@/models";
import { DateRange, TimePeriod, TimePeriodOptions } from "@/types";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Tooltip } from "@nextui-org/react";
import clsx from "clsx";
import { format, formatDate, parseISO, subMonths, subWeeks, subYears } from "date-fns";
import { ColorGenerator } from "hex-color-randomizer";
import { useState } from "react";
import { ResponsiveContainer, XAxis, Bar, BarChart } from "recharts";


const colors = ColorGenerator.generateRandomHexColorsArray(2)
const renderBarChart = (metrics: MetricsByPeriod[]) =>
    <ResponsiveContainer width="100%" height={130}>
        <BarChart data={metrics} margin={{ left: 0, right: 10 }}>
            <XAxis dataKey="period_start" />
            <Tooltip />
            <Bar dataKey="total" fill={colors[0]} />
        </BarChart>
    </ResponsiveContainer>

const PeriodSummary = () => {
    const [period, setPeriod] = useState<TimePeriod>("daily");
    const graphRangeModificators: Record<TimePeriod, number> = {
        daily: 7,
        weekly: 4,
        monthly: 0,
        yearly: 5
    }

    const SummaryBody = (period: TimePeriod, range: DateRange) => {
        let { data: periodExpenseData, isLoading, error } = useCalculateExpenses(range);
        const data = periodExpenseData?.data?.item;
        return (< div className="overflow-hidden" >
            <Table hideHeader removeWrapper>
                <TableHeader>
                    <TableColumn>Currency Code</TableColumn>
                    <TableColumn>Value</TableColumn>
                </TableHeader>
                <TableBody emptyContent={periodExpenseData?.meta.message}>
                    {Object.entries(data ?? [])
                        .filter(([_, value]) => value != null)
                        .map(([currency, value]) => (
                            <TableRow key={`${period}${currency}`}>
                                <TableCell>{currency}</TableCell>
                                <TableCell>{value}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div >)
    }

    const ReportBody = (period: TimePeriod, range: DateRange) => {
        switch (period) {
            case "weekly":
                range.start = format(subWeeks(range.start, graphRangeModificators.weekly), "yyyy-MM-dd");
            case "monthly":
                range.start = format(subMonths(range.start, graphRangeModificators.monthly), "yyyy-MM-dd");
            case "yearly":
                range.start = format(subYears(range.start, graphRangeModificators.yearly), "yyyy-MM-dd");
        }

        const { metrics, isLoading, error, mutate } = useFetchTransactionMetricsByPeriod(range.start, range.end, period, "CRC")
        let content: MetricsByPeriod[] = metrics?.data?.item ?? []

        if (!isLoading && content.length > 0) {
            content = content.map((item: MetricsByPeriod) => ({ ...item, period_start: formatDate(parseISO(item.period_start), "MMM d") }));
            return renderBarChart(content);
        }

        return (
            <div className="flex items-center justify-center" style={{ width: "100%", height: "100px" }}>
                {isLoading ? <Spinner size="lg" /> : <span>{metrics?.meta.message}</span>}
            </div>
        );
    }

    return (
        <div className="grid gap-3">
            <ByPeriodCard
                generateBody={SummaryBody}
                selectedPeriod={period}
                onTabUpdate={(newPeriod) => setPeriod(newPeriod)} />

            {/* Add another card for testing */}
            <ByPeriodCard
                generateBody={ReportBody}
                selectedPeriod={period}
                onTabUpdate={(newPeriod) => setPeriod(newPeriod)} />
        </div>
    );
};

export default PeriodSummary;
