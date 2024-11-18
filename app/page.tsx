"use client";

import TransactionTable from "@/components/Table/TransactionTable";
import { useTransactions } from "@/hooks/useTransactions";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const { transactions, pagination, isLoading, error } = useTransactions(page, rowsPerPage);

  return TransactionTable({
    isLoading: isLoading, transactions: transactions, pagination: pagination, onPageChange(page) {
      setPage(page);
    },
  });

}
