import {
  PullTransactionsResponseSchema,
  TransactionsResponseSchema,
} from "@/models";

// Base API URL
const BASE_URL = "/api/transactions";

// Function to fetch transactions
export const fetchTransactions = async (page: number, pageSize: number) => {
  const url = `${BASE_URL}?start_date=2024-11-05&end_date=2024-11-12&page=${page}&page_size=${pageSize}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch transactions: ${response.statusText}`);
  }

  const json = await response.json();

  return TransactionsResponseSchema.parse(json);
};

export const pullTransactions = async (
  start_date: string,
  end_date: string
) => {
  const url = `${BASE_URL}/pull?start_date=${start_date}&end_date=${end_date}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ start_date, end_date }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch transactions: ${response.statusText}`);
  }

  const json = await response.json();

  // Validate and parse the response
  return PullTransactionsResponseSchema.parse(json);
};
