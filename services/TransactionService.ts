import {
  ExpenseResponse,
  ExpenseResponseSchema,
  PullTransactionsResponseSchema,
  TransactionsResponseSchema,
} from "@/models";
import { formatDate } from "@/utils/date";
import { startOfTomorrow } from "date-fns";

export class TransactionService {
  private static BASE_URL = "/api/transactions";

  static async calculateExpenses(
    start_date: string,
    end_date: string
  ): Promise<ExpenseResponse> {
    const url = `${this.BASE_URL}/expenses?start_date=${start_date}&end_date=${end_date}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.statusText}`);
    }

    const json = await response.json();

    return ExpenseResponseSchema.parse(json); // Validate response schema
  }

  // Fetch paginated transactions
  static async fetchTransactions(page: number, pageSize: number) {
    const eod = startOfTomorrow();
    const url = `${this.BASE_URL}?start_date=2024-01-01&end_date=${formatDate(eod)}&page=${page}&page_size=${pageSize}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.statusText}`);
    }

    const json = await response.json();

    return TransactionsResponseSchema.parse(json); // Validate response schema
  }

  // Pull transactions for a date range
  static async pullTransactions(start_date: string, end_date: string) {
    const url = `${this.BASE_URL}/pull?start_date=${start_date}&end_date=${end_date}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Failed to pull transactions: ${response.statusText}`);
    }

    const json = await response.json();

    return PullTransactionsResponseSchema.parse(json); // Validate response schema
  }
}
