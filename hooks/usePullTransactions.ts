import useSWRMutation from "swr/mutation";
import {
  PullTransactionsResponse,
  PullTransactionsResponseSchema,
} from "@/models";
import { TransactionService } from "@/services/TransactionService";

// Wrapper fetcher for mutation
const fetcher = async (
  _: string, // Endpoint argument
  { arg }: { arg: { start_date: string; end_date: string } } // Payload argument
): Promise<PullTransactionsResponse> => {
  const result = await TransactionService.pullTransactions(
    arg.start_date,
    arg.end_date
  );
  return PullTransactionsResponseSchema.parse(result); // Validate the schema
};

// SWR Mutation hook for pulling transactions
export const usePullTransactions = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    `/transactions/pull`, // Cache key
    fetcher
  );

  return {
    pullTransactions: trigger, // Function to initiate the mutation
    data,
    error,
    isLoading: isMutating, // Loading state
  };
};
