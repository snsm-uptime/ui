"use client";
import React, { useState } from "react";
import TransactionTable from "@/components/Table/TransactionTable";
import { useTransactions } from "@/hooks/useTransactions";

const TransactionsPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const pageSize = 50; // Items per page

    const { transactions, pagination, isLoading, error } = useTransactions(page, pageSize);

    if (isLoading && !pagination) return <div className="p-4">Loading transactions...</div>;
    if (error) return <div className="p-4 text-red-600">Error: {error.message}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>
            <TransactionTable transactions={transactions} />
            <div className="mt-4 flex justify-between items-center">
                {/* Pagination controls */}
                <button
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {pagination!.page} of {pagination!.total_pages}
                </span>
                <button
                    disabled={pagination!.page >= pagination!.total_pages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionsPage;
