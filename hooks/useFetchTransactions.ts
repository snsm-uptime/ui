import useSWR from "swr";
import {TransactionsResponse, TransactionsResponseSchema} from "@/models";
import {TransactionService} from "@/services/TransactionService";

// Wrapper fetcher to handle parsing with Zod
const fetcher = async (
  page: number,
  pageSize: number
): Promise<TransactionsResponse> => {
  const result = await TransactionService.fetchTransactions(page, pageSize);
  return TransactionsResponseSchema.parse(result); // Validate the schema
};

// SWR hook for fetching transactions
export const useFetchTransactions = (page: number, pageSize: number) => {
  const {data, error, isValidating, mutate} = useSWR(
    [`/transactions`, page, pageSize], // Cache key based on page and pageSize
    () => fetcher(page, pageSize), // Fetcher function
    {revalidateOnFocus: false} // Optional SWR options
  );

  return {
    data,
    error,
    isLoading: !error && !data && isValidating,
    mutate, // Allows manual revalidation
  };
};
