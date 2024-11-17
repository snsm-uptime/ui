import { TransactionsResponseSchema } from "@/models";

// Base API URL
const BASE_URL = "/api/transactions/";

// Function to fetch transactions
export const fetchTransactions = async (page: number, pageSize: number) => {
  const url = `${BASE_URL}?start_date=2024-11-05&end_date=2024-11-12&page=${page}&page_size=${pageSize}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch transactions: ${response.statusText}`);
  }

  const json = await response.json();

  // Validate and parse the response
  return TransactionsResponseSchema.parse(json);
};
