import { z } from "zod";
import { authRouter } from "./authRouter";
import { publicProcedure, router } from "./trpc";
import {
  PurchasedProductsQueryValidator,
  QueryValidator,
} from "../lib/validators/query-validator";
import { getPayloadClient } from "../lib/get-payload";
import { Payload } from "payload";
import { paymentRouter } from "./payment-router";

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,
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
      //   prevPage
      // );
      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
        prevPage: hasPrevPage ? prevPage : null,
        hasNextPage,
      };
      // } else if (type) {
      //   const {
      //     docs: items,
      //     hasNextPage,
      //     nextPage,
      //   } = await payload.find({
      //     collection: "products",
      //     where: {
      //       approvedForSale: {
      //         equals: "approved",
      //       },
      //       type: {
      //         equals: type,
      //       },
      //     },
      //     sort,
      //     depth: 1,
      //     limit,
      //     page,
      //   });
      //   return {
      //     items,
      //     nextPage: hasNextPage ? nextPage : null,
      //   };
      // } else if (category) {
      //   const {
      //     docs: items,
      //     hasNextPage,
      //     nextPage,
      //   } = await payload.find({
      //     collection: "products",
      //     where: {
      //       approvedForSale: {
      //         equals: "approved",
      //       },
      //       category: {
      //         equals: category,
      //       },
      //     },
      //     sort,
      //     depth: 1,
      //     limit,
      //     page,
      //   });
      //   return {
      //     items,
      //     nextPage: hasNextPage ? nextPage : null,
      //   };
      // } else {
      //   const {
      //     docs: items,
      //     hasNextPage,
      //     nextPage,
      //   } = await payload.find({
      //     collection: "products",
      //     where: {
      //       approvedForSale: {
      //         equals: "approved",
      //       },
      //     },
      //     sort,
      //     depth: 1,
      //     limit,
      //     page,
      //   });
      //   return {
      //     items,
      //     nextPage: hasNextPage ? nextPage : null,
      //   };
      // }
    }),

  getPurchasedProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: PurchasedProductsQueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, userId } = query;

      const payload = await getPayloadClient();

      // const parsedQueryOpts: Record<string, { equals: string }> = {};

      // Object.entries(queryOpts).forEach(([key, value]) => {
      //   parsedQueryOpts[key] = {
      //     equals: value,
      //   };
      // });

      const page = cursor || 1;

      const {
        docs: orders,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "orders",
        where: {
          user: {
            equals: userId,
          },
          _isPaid: {
            equals: true,
          },
        },
        sort,
        depth: 3,
        limit,
        page,
      });

      const purchasedProductsArray = orders
        .flatMap(({ products }) => products)
        .flatMap((prod) => {
          if (typeof prod === "string") return null;
          else return prod;
        });
      // .filter((prod) => prod !== null);

      const purchasedProducts = Array.from(new Set(purchasedProductsArray));
      return {
        purchasedProducts,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});
export type AppRouter = typeof appRouter;
