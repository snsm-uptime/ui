import { z } from 'zod';

export const TransactionSchema = z.object({
  id: z.string(),
  bank_name: z.string(),
  bank_email: z.string().email(),
  business: z.string(),
  currency: z.string().length(3), // E.g., "USD"
  date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date" }),
  value: z.number(),
  body: z.string(),
  business_type: z.string().optional(),
  expense_priority: z.number().optional(),
  expense_type: z.number().optional(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
