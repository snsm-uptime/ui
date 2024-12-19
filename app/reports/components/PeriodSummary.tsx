"use client";
import CardHeaderSwitch from "@/components/Generic/CardHeaderSwitch";
import { useCalculateExpenses } from "@/hooks/useCalculateExpenses";
import { TimePeriod, TimePeriodOptions } from "@/types";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useState } from "react";

export default function PeriodSumamry() {
    const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("daily")
    const Body = () => {
        const range = TimePeriodOptions[selectedPeriod].getRange();
        let { data: periodExpenseData, isLoading, error } = useCalculateExpenses(range);
        if (periodExpenseData?.meta.status === 200) {
            const data = periodExpenseData.data!.item;
            return <div className="flex flex-col">
                {Object.entries(data).filter(([_, value]) => value != null).map(([currency, value]) => <span>{currency} {value}</span>)}
            </div>
        }
        return <h3 className="text-center w-2/4">{periodExpenseData?.meta.message}</h3>
    }
    const options = Object.fromEntries(
        Object.entries(TimePeriodOptions).map(([key, value]) => [key, value.label])
    ) as Record<TimePeriod, string>;

    return (
        <Card>
            <CardHeaderSwitch options={options} onChange={(label) => setSelectedPeriod(label as TimePeriod)}>
            </CardHeaderSwitch>
            <Divider />
            <CardBody><Body /></CardBody>
        </Card >
    );
}