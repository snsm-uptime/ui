import { PaginationSchema } from "@/models/Pagination";
import { TransactionSchema } from "@/models/Transaction";
import { z, ZodTypeAny } from "zod";

// Define the generic ApiResponseSchema factory
export const ApiResponseSchema = <T extends ZodTypeAny>(dataSchema: T) =>
  z.object({
    meta: z.object({
      status: z.number(),
      message: z.union([z.string(), z.array(z.string())]),
      request_time: z.number(),
    }),
    data: dataSchema.nullable(), // Use the provided schema for the "data" field
  });

// Export a type for the generic API response
export type ApiResponse<T extends ZodTypeAny> = z.infer<
  ReturnType<typeof ApiResponseSchema<T>>
>;

export const ExpenseResponseSchema = ApiResponseSchema(
  z.object({
    item: z.object({
      dollars: z.number(),
      colones: z.number(),
    }),
  })
);
export type ExpenseResponse = z.infer<typeof ExpenseResponseSchema>;

export const TransactionsResponseSchema = ApiResponseSchema(
  z.object({
    pagination: PaginationSchema,
    items: z.array(TransactionSchema),
  })
);

export type TransactionsResponse = z.infer<typeof TransactionsResponseSchema>;

const PullTransactionsDataSchema = z.object({
  total_found: z.number(),
  new_entries: z.array(z.string()),
  existing_entries: z.array(z.string()),
});

export const PullTransactionsResponseSchema = ApiResponseSchema(
  PullTransactionsDataSchema
);

export type PullTransactionsResponse = z.infer<
  typeof PullTransactionsResponseSchema
>;
