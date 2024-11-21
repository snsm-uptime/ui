"use client";

import TransactionTable from "@/app/transactions/components/TransactionTable";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";
import { Transaction } from "@/models";
import { Input, Selection } from "@nextui-org/react";
import { Key, useState } from "react";
import TransactionSelectionStats from "./components/SelectionStats";
import ExpensesCard from "./components/ExpensesCard";
import clsx from "clsx";
import FetchOptionsDropdown from "./components/FetchOptionsDropdown";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

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
        return <div className="text-gray-500">Loading transactions...</div>;
    }
    const horizontalSpacing = "gap-x-4";
    const verticalSpacing = "gap-y-4";

    return (
        <div className={clsx("flex flex-col", verticalSpacing)}>
            <Input variant="bordered" type="text" label="Search" isClearable />
            <div className={clsx("flex flex-row", horizontalSpacing)}>
                <div className={clsx("flex flex-col", verticalSpacing)}>
                    {selectedTransactions.length > 0 ? (
                        <div
                            className={clsx(
                                "transition-all animate-slideDown",
                                selectedTransactions.length > 0 ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
                            )}
                        >
                            <TransactionSelectionStats selections={selectedTransactions} />
                        </div>
                    ) : null}
                    <ExpensesCard
                        period="daily"
                        transactions={transactions}
                    ></ExpensesCard>
                    <ExpensesCard
                        period="weekly"
                        transactions={transactions}
                    ></ExpensesCard>
                    <ExpensesCard
                        period="monthly"
                        transactions={transactions}
                    ></ExpensesCard>
                </div>
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
