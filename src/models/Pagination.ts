import { z } from "zod";

export const PaginationSchema = z.object({
  total_items: z.number(),
  total_pages: z.number(),
  page_size: z.number(),
  page: z.number(),
  next_cursor: z.string().nullable(),
  prev_cursor: z.string().nullable(),
});

export type Pagination = z.infer<typeof PaginationSchema>;
