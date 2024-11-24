import clsx from "clsx";
import ExpensesCard from "./ExpensesCard";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { getDateRange } from "@/utils/date";
import { DateRange, TimePeriod } from "@/types";
import { useCalculateExpenses } from "@/hooks/useCalculateExpenses";
import React from "react";

const periodConfig: Record<
    TimePeriod,
    { range: DateRange; title: string; }
> = {
    daily: {
        range: getDateRange("daily"),
        title: "Today's Expenses",
    },
    weekly: {
        range: getDateRange("weekly"),
        title: `This Week's Expenses (${format(startOfWeek(new Date()), "MMM d")} - ${format(
            endOfWeek(new Date()),
            "MMM d"
        )})`,
    },
    monthly: {
        range: getDateRange("monthly"),
        title: `Expenses for ${format(new Date(), "MMMM")}`,
    },
};

export default function SideCards({ className, children }: { className: string, children: React.ReactNode }) {
    const cards: React.ReactNode[] = Object.entries(periodConfig).map(([period, { title, range }]) => {
        let { data, isLoading, error } = useCalculateExpenses(range);
        let totalCRC = 0;
        let totalUSD = 0;
        let totals = data?.data?.item;
        if (totals) {
            totalCRC = totals.colones;
            totalUSD = totals.dollars;
        }
        return (
            <ExpensesCard key={period} title={title} totalCRC={totalCRC} totalUSD={totalUSD} />
        );
    });
    return (<div className={className}>
        {/* TODO: Add animation to the other expense cards to slide down as a group */}
        {children}
        {...cards}
    </div>
    );
}