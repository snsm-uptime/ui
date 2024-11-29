import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { CardContent } from "@/types";
import { CardBody, CardHeader } from "@nextui-org/react";

export default function DashboardView() {
    const dailyTransactionsBarChart = { header: <CardHeader>header</CardHeader>, body: <CardBody>demo</CardBody> };
    const weeklyTransactionsBarChart = { header: <CardHeader>header</CardHeader>, body: <CardBody>demo</CardBody> };
    const monthlyTransactionsBarChart = { header: <CardHeader>header</CardHeader>, body: <CardBody>demo</CardBody> };

    const chartView = { header: <CardHeader>header</CardHeader>, body: <CardBody>demo</CardBody> };

    const firstRowItems: CardContent[] = [
        weeklyTransactionsBarChart,
        monthlyTransactionsBarChart
    ];

    return (
        <DashboardLayout
            rowItems={firstRowItems}
            topLeft={dailyTransactionsBarChart}
            bottomLeft={chartView}
            right={<div>Right (Card 9)</div>}
        />
    );
}
