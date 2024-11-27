import useSWR from "swr";
import {
  TransactionMetricsByPeriodResponse,
  TransactionsResponse,
  TransactionsResponseSchema,
} from "@/models";
import {TransactionService} from "@/services/TransactionService";
import {Currency, TimePeriod} from "@/types";

// Wrapper fetcher to handle parsing with Zod
const fetcher = async (
  start_date: string,
  end_date: string,
  period: TimePeriod,
  currency: Currency
): Promise<TransactionMetricsByPeriodResponse> => {
  const result = await TransactionService.fetchTransactionMetricsByPeriod(
    start_date,
    end_date,
    period,
    currency
  );
  return result;
};

// SWR hook for fetching transactions
export const useFetchTransactionMetricsByPeriod = (
  start_date: string,
  end_date: string,
  period: TimePeriod,
  currency: Currency
) => {
  const {data, error, isValidating, mutate} = useSWR(
    [`/transactions/metrics`, start_date, end_date, period, currency],
    () => fetcher(start_date, end_date, period, currency),
    {revalidateOnFocus: false} // Optional SWR options
  );

  return {
    metrics: data,
    error,
    isLoading: !error && !data && isValidating,
    mutate,
  };
};
