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

export default function ReportsView() {
    const [currency, setCurrency] = useState<Currency>(Currency.CRC);
    const changeCurrency = () => {
        const currencies = Object.values(Currency);
        currencies.pop();
        let currentIndex = currencies.indexOf(currency);
        const nextIndex = (currentIndex + 1) % currencies.length;
        setCurrency(currencies[nextIndex]);
    };

    const renderCurrencySwitch = () => <Chip className="cursor-pointer" onClick={changeCurrency}>{currency}</Chip>;
    return (
        <div className="space-y-4">
            <h1 className="text-lg">Reports by period</h1>
            <Carousel items={[
                <TotalFromTransactionsOverTimeChart period="daily" currency={currency} leftCornerContent={renderCurrencySwitch()} />,
                <TotalFromTransactionsOverTimeChart period="weekly" currency={currency} leftCornerContent={renderCurrencySwitch()} />,
                <TotalFromTransactionsOverTimeChart period="monthly" currency={currency} leftCornerContent={renderCurrencySwitch()} />
            ]}
            />
        </div>
    );
}