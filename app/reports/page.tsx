"use client";
import { useFetchTransactionMetricsByPeriod } from "@/hooks/useFetchMetricsByPeriod";
import { useState } from "react";
import BarChart from "./charts/bar";

export default function ReportsView() {
    const [selectedRange, setSelectedRange] = useState<{
        start: string | null;
        end: string | null;
    }>({ start: null, end: null });

    return (
        <div className="flex flex-col">
            <h1>Reports by period</h1>
            <BarChart date_range={{ start: "2022-11-01", end: "2024-11-25" }} period="daily" />
        </div>
    );
}