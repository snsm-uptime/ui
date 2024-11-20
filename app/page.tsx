"use client";

import TableDetailCard from "@/components/Table/TableDetailCard";
import TransactionTable from "@/components/Table/TransactionTable";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";
import { Transaction } from "@/models";
import { Selection } from "@nextui-org/react";
import { Key, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const rowsPerPage: number = parseInt(process.env.DEFAULT_ROWS!);
  const [selectedTransactions, setSelectedTransactions] = useState<Transaction[]>([]);
  const { data, isLoading, error, mutate } = useFetchTransactions(page, rowsPerPage);

  // Pagination and transaction data fallback
  const transactions = data?.data?.items ?? [];
  const pagination = data?.data?.pagination ?? null;

  const sumSelectedTransactions = (): number => {
    return selectedTransactions.reduce((sum, transaction) => sum + transaction.value, 0);
  }

  const onSelectionChange = (keys: Selection) => {
    if (keys === "all") {
      setSelectedTransactions(transactions);
    }

    let filtered = transactions
      .filter((transaction) => (keys as Set<Key>).has(transaction.id))
    setSelectedTransactions(filtered)
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
      <TableDetailCard className="h-fit min-w-48"
        title="Selection SUM"
        subtitle={`${selectedTransactions.length} Items Selected`}
        children={<h4>{sumSelectedTransactions()}</h4>}></TableDetailCard>
      <TransactionTable
        isLoading={isLoading}
        onPageChange={(page) => setPage(page)}
        onPullComplete={() => mutate()}
        onSelectionChange={onSelectionChange}
        pagination={pagination}
        selectionMode="multiple"
        transactions={transactions}
      />
    </div>
  );
}
