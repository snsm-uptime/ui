"use client";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { CardContent, Currency } from "@/types";
import { CardBody, CardHeader } from "@nextui-org/react";
import clsx from "clsx";
import TotalFromTransactionsOverTimeChart from "../reports/charts/TotalFromTransactionsOverTimeChart";
import { Key, useState } from "react";
import { Selection } from "@nextui-org/react";
import TransactionTable from "../transactions/components/TransactionTable";
import { Transaction } from "@/models";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";
import TotalExpenses from "@/components/Dashboard/Cards/TotalExpenses";
import ExpensesCard from "../transactions/components/ExpensesCard";
import CurrencySpan from "@/components/FormattedText/CurrencySpan";
import { useCalculateExpenses } from "@/hooks/useCalculateExpenses";
import { getDateRange } from "@/utils/date";

export default function DashboardView() {
    const [page, setPage] = useState(1);
    const rowsPerPage: number = parseInt(process.env.DEFAULT_ROWS!);
    const [selectedTransactions, setSelectedTransactions] = useState<
        Transaction[]
    >([]);

    const {
        data: transactionData,
        isLoading: isTransactionsLoading,
        error: transactionsError,
        mutate: mutateTransactions,
    } = useFetchTransactions(page, rowsPerPage);

    const transactions = transactionData?.data?.items ?? [];
    const pagination = transactionData?.data?.pagination ?? null;

    // Selection logic
    const onSelectionChange = (keys: Selection) => {
        keys === "all"
            ? setSelectedTransactions(transactions)
            : setSelectedTransactions(
                transactions.filter((transaction) =>
                    (keys as Set<Key>).has(transaction.id)
                )
            );
    };

    const [currency, setCurrency] = useState<Currency>(Currency.CRC);


    let { data: dailyExpensesData, isLoading: isDailyExpensesLoading, error: dailyExpensesError } = useCalculateExpenses(getDateRange("daily"));
    let expenseData = dailyExpensesData?.data?.item;

    const styles = {
        cardHeader: clsx("text-md font-bold"),

    }
    const dailyStatistics = {
        header: <h3 className={styles.cardHeader}>Today's Summary</h3>, body:
            <div className="flex flex-col">
                {expenseData ? Object.entries(expenseData).map(([currency, value]) => <CurrencySpan currency={currency as Currency} value={value ?? 0} />) : <span>No transactions as of now</span>}

            </div>
    };
    const dailyTransactionsBarChart = { header: <h3 className={styles.cardHeader}>Daily Transactions</h3>, body: <TotalFromTransactionsOverTimeChart period="daily" currency={currency} /> };
    const weeklyTransactionsBarChart = { header: <h3 className={styles.cardHeader}>Weekly Transactions</h3>, body: <TotalFromTransactionsOverTimeChart period="weekly" currency={currency} /> };
    const monthlyTransactionsBarChart = { header: <h3 className={styles.cardHeader}>Monthly Transactions</h3>, body: <TotalFromTransactionsOverTimeChart period="monthly" currency={currency} /> };

    const chartView = { header: <CardHeader>header</CardHeader>, body: <CardBody>demo</CardBody> };

    const firstRowItems: CardContent[] = [
        dailyStatistics,
        weeklyTransactionsBarChart,
        monthlyTransactionsBarChart
    ];

    return (
        <DashboardLayout
            rowItems={firstRowItems}
            topLeft={dailyTransactionsBarChart}
            bottomLeft={chartView}
            right={<TransactionTable
                isLoading={isTransactionsLoading}
                onPageChange={(page) => {
                    setPage(page);
                    setSelectedTransactions([]);
                }}
                onPullComplete={() => mutateTransactions()}
                onSelectionChange={onSelectionChange}
                pagination={pagination}
                selectionMode="multiple"
                transactions={transactions}
            />}
        />
    );
}
