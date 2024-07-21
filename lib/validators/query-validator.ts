import { z } from "zod";

export const QueryValidator = z.object({
  category: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
});

export const PurchasedProductsQueryValidator = z.object({
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
  userId: z.string(),
});

export type TQueryValidator = z.infer<typeof QueryValidator>;
export type TPurchasedProductsQueryValidator = z.infer<
  typeof PurchasedProductsQueryValidator
>;
