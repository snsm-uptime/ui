"use client";
import React, { useState } from 'react';
import useSWR from 'swr';
import { endOfYesterday, format, startOfTomorrow } from 'date-fns';

const fetcher = (url: string) => fetch(url, { method: "GET" }).then((res) => res.json());

export default function TotalExpenses() {
    const [dateRange, setDateRange] = useState("month");

    // Calculate start and end dates based on the selected date range
    const calculateDateRange = () => {
        const eod = startOfTomorrow();
        let startDate = endOfYesterday();

        switch (dateRange) {
            case "week":
                startDate.setDate(eod.getDate() - 7);
                break;
            case "15days":
                startDate.setDate(eod.getDate() - 15);
                break;
            case "month":
                startDate.setMonth(eod.getMonth() - 1);
                break;
            default:
                startDate = eod;
        }

        return {
            start_date: format(startDate, "yyyy-MM-dd"),
            end_date: format(eod, "yyyy-MM-dd"),
        };
    };

    const { start_date, end_date } = calculateDateRange();

    const endpoint: string = `/api/transactions/expenses?start_date=${start_date}&end_date=${end_date}`;

    const { data, error, isLoading } = useSWR(endpoint, fetcher);

    let usd = "$0.00"
    let crc = "₡0.00"

    if (data && data.meta.status == 200) {
        let result = data.data.item;
        usd = result.dollars;
        crc = result.colones;
    }

    return (
        <div className="bg-[var(--bg-z1)] p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-[var(--h1)] mb-2">Total Expenses</h2>

            <div className="mb-4">
                <label htmlFor="dateRange" className="mr-2">Select Date Range:</label>
                <select
                    id="dateRange"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="border p-1 rounded"
                >
                    <option value="week">Last 7 days</option>
                    <option value="15days">Last 15 days</option>
                    <option value="month">Last 30 days</option>
                    <option value="custom">Custom</option>
                </select>
            </div>

            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">Failed to fetch expenses.</p>}
            {data && (
                <div>
                    <p className="text-2xl font-bold text-red-500">{usd}</p>
                    <p className="text-2xl font-bold text-red-500">{crc}</p>
                </div>
            )}
        </div>
    );
};

