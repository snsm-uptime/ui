"use client";

import TransactionTable from "@/app/transactions/components/TransactionTable";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";
import { Transaction } from "@/models";
import { Input, Selection, Spinner } from "@nextui-org/react";
import clsx from "clsx";
import { Key, useState } from "react";
import ExpensesCard from "./components/ExpensesCard";
import TransactionSelectionStats from "./components/SelectionStats";
import SideCards from "./components/SideCards";

export default function TransactionsView() {
    const [page, setPage] = useState(1);
    const rowsPerPage: number = parseInt(process.env.DEFAULT_ROWS!);
    const [selectedTransactions, setSelectedTransactions] = useState<
        Transaction[]
    >([]);

    const { data, isLoading, error, mutate } = useFetchTransactions(
        page,
        rowsPerPage
    );

    // Pagination and transaction data fallback
    const transactions = data?.data?.items ?? [];
    const pagination = data?.data?.pagination ?? null;

    const onSelectionChange = (keys: Selection) => {
        keys === "all"
            ? setSelectedTransactions(transactions)
            : setSelectedTransactions(
                transactions.filter((transaction) =>
                    (keys as Set<Key>).has(transaction.id)
                )
            );
    };

    // Error handling
    if (error) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }

    if (isLoading) {
        // TODO: Table Skeleton when loading
        return <div className="flex h-full items-center justify-center pb-16"><Spinner size="lg" /></div>;
    }
    const horizontalSpacing = "gap-x-4";
    const verticalSpacing = "gap-y-4";

    return (
        <div className={clsx("flex flex-col", verticalSpacing)}>
            <Input variant="bordered" type="text" label="Search" isClearable />
            <div className={clsx("flex flex-col md:flex-row", horizontalSpacing, verticalSpacing)}>
                <SideCards className={clsx("flex flex-row md:flex-col overflow-auto", verticalSpacing, horizontalSpacing)} children={
                    selectedTransactions.length > 0 ? (
                        <div
                            className={clsx(
                                "transition-all animate-slideDown",
                                selectedTransactions.length > 0 ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
                            )}
                        >
                            <TransactionSelectionStats selections={selectedTransactions} />
                        </div>
                    ) : null}
                />
                <TransactionTable
                    isLoading={isLoading}
                    onPageChange={(page) => {
                        setPage(page);
                        setSelectedTransactions([]);
                    }}
                    onPullComplete={() => mutate()}
                    onSelectionChange={onSelectionChange}
                    pagination={pagination}
                    selectionMode="multiple"
                    transactions={transactions}
                />
            </div>
        </div>
    );
}
