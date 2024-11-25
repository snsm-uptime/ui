import useSWR from "swr";
import {
  TransactionMetricsByPeriodResponse,
  TransactionsResponse,
  TransactionsResponseSchema,
} from "@/models";
import {TransactionService} from "@/services/TransactionService";
import {TimePeriod} from "@/types";

// Wrapper fetcher to handle parsing with Zod
const fetcher = async (
  start_date: string,
  end_date: string,
  period: TimePeriod
): Promise<TransactionMetricsByPeriodResponse> => {
  const result = await TransactionService.fetchTransactionMetricsByPeriod(
    start_date,
    end_date,
    period
  );
  return result;
};

// SWR hook for fetching transactions
export const useFetchTransactionMetricsByPeriod = (
  start_date: string,
  end_date: string,
  period: TimePeriod
) => {
  const {data, error, isValidating, mutate} = useSWR(
    [`/transactions/metrics`, start_date, end_date, period],
    () => fetcher(start_date, end_date, period),
    {revalidateOnFocus: false} // Optional SWR options
  );

  return {
    data,
    error,
    isLoading: !error && !data && isValidating,
    mutate,
  };
};
