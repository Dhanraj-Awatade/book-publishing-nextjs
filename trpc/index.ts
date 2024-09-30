import { z } from "zod";
import { authRouter } from "./authRouter";
import { publicProcedure, router } from "./trpc";
import { QueryValidator } from "../lib/validators/query-validator";
import { getPayloadClient } from "../lib/get-payload";
import { paymentRouter } from "./payment-router";
import { productRouter } from "./productRouter";
import { shipmentRouter } from "./shippingRouter";

export const appRouter = router({
    auth: authRouter,
    payment: paymentRouter,
    productProcedures: productRouter,
    shipmentProcedures: shipmentRouter,
    getInfiniteProducts: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100),
                cursor: z.number().nullish(),
                query: QueryValidator,
            })
        )
        .query(async ({ input }) => {
            const { query, cursor } = input;
            const { sort, limit, /*category, type,*/ ...queryOpts } = query;

            const payload = await getPayloadClient();

            const parsedQueryOpts: Record<string, { equals: string }> = {};

            Object.entries(queryOpts).forEach(([key, value]) => {
                parsedQueryOpts[key] = {
                    equals: value,
                };
            });

            const page = cursor || 1;
            // console.log("cursor:", cursor);
            // if (category && type) {
            try {
                const {
                    docs: items,
                    hasNextPage,
                    nextPage,
                    hasPrevPage,
                    prevPage,
                } = await payload.find({
                    collection: "products",
                    where: {
                        approvedForSale: {
                            equals: "approved",
                        },
                        ...parsedQueryOpts,
                        // category: {
                        //   equals: category,
                        // },
                        // type: {
                        //   equals: type,
                        // },
                    },
                    sort,
                    depth: 1,
                    limit,
                    page,
                });
                // console.log(
                //   "hasNextPage:",
                //   hasNextPage,
                //   "nextPage:",
                //   nextPage,
                //   "hasPrevPage:",
                //   hasPrevPage,
                //   "prevPage:",
                //   prevPage,
                //   "items:",
                //   items
                // );
                return {
                    items,
                    nextPage: hasNextPage ? nextPage : null,
                    prevPage: hasPrevPage ? prevPage : null,
                    hasNextPage,
                    hasPrevPage,
                };
            } catch (error) {
                console.log(
                    "Error fetching products, fetching next products; Error:",
                    error
                );
                const {
                    docs: items,
                    hasNextPage,
                    nextPage,
                    hasPrevPage,
                    prevPage,
                } = await payload.find({
                    collection: "products",
                    where: {
                        approvedForSale: {
                            equals: "approved",
                        },
                        ...parsedQueryOpts,
                    },
                    sort,
                    depth: 1,
                    limit,
                    page: page + 1,
                });
                return {
                    items,
                    nextPage: hasNextPage ? nextPage : null,
                    prevPage: hasPrevPage ? prevPage : null,
                    hasNextPage,
                    hasPrevPage,
                };
            }
        }),
});
export type AppRouter = typeof appRouter;
