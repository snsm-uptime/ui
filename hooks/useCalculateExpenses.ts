import useSWR from "swr";
import { TransactionService } from "@/services/TransactionService";
import { ExpenseResponse, ExpenseResponseSchema } from "@/models";
import { DateRange } from "@/types";

// Wrapper fetcher to handle parsing with Zod
const fetcher = async (
  start_date: string,
  end_date: string
): Promise<ExpenseResponse> => {
  const result = await TransactionService.calculateExpenses(
    start_date,
    end_date
  );
  return ExpenseResponseSchema.parse(result);
};

// SWR hook for fetching transactions
export const useCalculateExpenses = (range: DateRange) => {
  const { data, error, isValidating, mutate } = useSWR(
    [`/transactions/expenses`, range.start, range.end],
    () => fetcher(range.start, range.end),
    { revalidateOnFocus: false }
  );

  return {
    data,
    error,
    isLoading: !error && !data && isValidating,
    mutate,
  };
};
