import { PaginationSchema } from "@/models/Pagination";
import { TransactionSchema } from "@/models/Transaction";
import { z, ZodTypeAny } from "zod";

// Define the generic ApiResponseSchema factory
export const ApiResponseSchema = <T extends ZodTypeAny>(dataSchema: T) =>
  z.object({
    meta: z.object({
      status: z.number(),
      message: z.string(),
      request_time: z.number(),
    }),
    data: dataSchema, // Use the provided schema for the "data" field
  });

// Export a type for the generic API response
export type ApiResponse<T extends ZodTypeAny> = z.infer<
  ReturnType<typeof ApiResponseSchema<T>>
>;

export const TransactionsResponseSchema = ApiResponseSchema(
  z.object({
    pagination: PaginationSchema,
    items: z.array(TransactionSchema),
  })
);

export type TransactionsResponse = z.infer<typeof TransactionsResponseSchema>;
