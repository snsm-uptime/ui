import { pullTransactions } from "@/services/transactionService";
import { formatDate } from "@/utils/date";

export const usePullTransactions = (start_date: Date, end_date: Date) => {
  const result = pullTransactions("2024-11-18", formatDate(end_date));
  console.table(result);
};
