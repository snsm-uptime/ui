"use client";
import { useFetchTransactionMetricsByPeriod } from "@/hooks/useFetchMetricsByPeriod";
import { useState } from "react";
import BarChart from "./charts/CurrencyExpensesByPeriodChart";
import CurrencyExpensesByPeriodChart from "./charts/CurrencyExpensesByPeriodChart";
import { Currency } from "@/types";

export default function ReportsView() {
    const [selectedRange, setSelectedRange] = useState<{
        start: string | null;
        end: string | null;
    }>({ start: null, end: null });

    return (
        <div className="flex flex-col">
            <h1>Reports by period</h1>
            <CurrencyExpensesByPeriodChart date_range={{ start: "2022-10-01", end: "2024-10-31" }} period="daily" currency={Currency.CRC} />
        </div>
    );
}