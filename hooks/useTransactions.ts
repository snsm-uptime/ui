import useSWR from "swr";
import { fetchTransactions } from "@/services/transactionService";

export const useTransactions = (page: number, pageSize: number) => {
  const { data, error, isLoading } = useSWR(
    [page, pageSize], // SWR cache key
    ([page, pageSize]) => fetchTransactions(page, pageSize), // Call the service function
    { keepPreviousData: true }
  );

  return {
    transactions: data?.data.items || [],
    pagination: data?.data.pagination || null,
    error,
    isLoading,
  };
};
