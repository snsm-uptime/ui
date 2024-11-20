"use client";

import TransactionTable from "@/components/Table/TransactionTable";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";
import { Transaction } from "@/models";
import { Selection } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const rowsPerPage: number = parseInt(process.env.DEFAULT_ROWS!);
  const { data, isLoading, error, mutate } = useFetchTransactions(page, rowsPerPage);

  // Pagination and transaction data fallback
  const transactions = data?.data?.items ?? [];
  const pagination = data?.data?.pagination ?? null;

  const sumFilteredTransactions = (keys: Selection): number => {
    if (keys === "all") {
      return transactions.reduce((sum, transaction) => sum + transaction.value, 0);
    }

    return transactions
      .filter((transaction) => keys.has(transaction.id))
      .reduce((sum, transaction) => sum + transaction.value, 0);
  }

  const onSelectionChange = (keys: Selection) => {
    console.log(sumFilteredTransactions(keys))
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
    <TransactionTable
      isLoading={isLoading}
      transactions={transactions}
      pagination={pagination}
      onPageChange={(page) => setPage(page)}
      onPullComplete={() => mutate()}
      selectionMode="multiple"
      onSelectionChange={onSelectionChange}
    />
  );
}
