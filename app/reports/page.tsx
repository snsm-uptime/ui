"use client";
import { useFetchTransactionMetricsByPeriod } from "@/hooks/useFetchMetricsByPeriod";
import BarChart from "./charts/CurrencyExpensesByPeriodChart";
import CurrencyExpensesByPeriodChart from "./charts/CurrencyExpensesByPeriodChart";
import { Currency, TimePeriod } from "@/types";
import { endOfMonth, format, startOfMonth } from "date-fns";
import TotalFromTransactionsOverTimeChart from "./charts/TotalFromTransactionsOverTimeChart";
import { Chip } from "@nextui-org/react";
import { useState } from "react";
import Carousel from "@/components/Carousel";
import PeriodSumamry from "./components/PeriodSummary";

export default function ReportsView() {
    return <PeriodSumamry />
}