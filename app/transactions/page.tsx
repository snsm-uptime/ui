"use client";

import TransactionTable from "@/app/transactions/components/TransactionTable";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";
import { Transaction } from "@/models";
import { Selection } from "@nextui-org/react";
import { Key, useState } from "react";
import TransactionSelectionStats from "./components/SelectionStats";
import ExpensesCard from "./components/ExpensesCard";

export default function TransactionsView() {
    const [page, setPage] = useState(1);
    const rowsPerPage: number = parseInt(process.env.DEFAULT_ROWS!);
    const [selectedTransactions, setSelectedTransactions] = useState<Transaction[]>([]);
    const { data, isLoading, error, mutate } = useFetchTransactions(page, rowsPerPage);

    // Pagination and transaction data fallback
    const transactions = data?.data?.items ?? [];
    const pagination = data?.data?.pagination ?? null;

    const onSelectionChange = (keys: Selection) => {
        keys === "all" ?
            setSelectedTransactions(transactions) :
            setSelectedTransactions(
                transactions.filter((transaction) => (keys as Set<Key>).has(transaction.id))
            )
    }

    // Error handling
    if (error) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }

    if (isLoading) {
        // TODO: Table Skeleton when loading
        return <div className="text-gray-500">Loading transactions...</div>;
    }

    return (
        <div className="flex flex-row space-x-4">
            <div className="flex flex-col space-y-4">
                <ExpensesCard transactions={transactions}></ExpensesCard>
                <TransactionSelectionStats selections={selectedTransactions} />
            </div>
            <TransactionTable
                isLoading={isLoading}
                onPageChange={(page) => { setPage(page); setSelectedTransactions([]) }}
                onPullComplete={() => mutate()}
                onSelectionChange={onSelectionChange}
                pagination={pagination}
                selectionMode="multiple"
                transactions={transactions}
            />
        </div>
    );

}