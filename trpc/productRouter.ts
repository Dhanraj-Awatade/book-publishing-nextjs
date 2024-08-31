import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { PurchasedProductsQueryValidator } from "../lib/validators/query-validator";
import { getPayloadClient } from "../lib/get-payload";
import { Product } from "../payload-types";
import { FALLBACK_CURSOR, FALLBACK_ORDER_LIMIT } from "../lib/config/constants";

export const productRouter = router({
  getPurchasedProducts: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: PurchasedProductsQueryValidator,
      })
    )
    .query(async ({ input, ctx }) => {
      const { query, cursor } = input;
      const { sort, limit } = query;

      const { user } = ctx;
      const payload = await getPayloadClient();

      const page = cursor || 1;

      const {
        docs: orders,
        hasNextPage,
        nextPage,
        hasPrevPage,
        prevPage,
      } = await payload.find({
        collection: "orders",
        where: {
          user: {
            equals: user.id,
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
        .flatMap(({ products }) =>
          products.map((prod) => (typeof prod === "string" ? null : prod))
        )
        .filter(
          (prod): prod is Product => prod?.type === "ebook" && prod !== null
        );

      const items = Array.from(new Set(purchasedProductsArray));
      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
        prevPage: hasPrevPage ? prevPage : null,
        hasNextPage,
        hasPrevPage,
      };
    }),

  /* ----------------------------------------------------------------------------------------- */

  getOrders: privateProcedure
    .input(z.object({ cursor: z.number() }))
    .query(async ({ ctx, input }) => {
      const user = ctx.user;
      const { cursor } = input;
      const payload = await getPayloadClient();

      const page = cursor || FALLBACK_CURSOR;
      const limit = FALLBACK_ORDER_LIMIT;

      if (user.role === "editor" || "admin") {
        const {
          docs: allOrders,
          hasNextPage,
          hasPrevPage,
          nextPage,
          prevPage,
        } = await payload.find({
          collection: "orders",
          depth: 4,
          where: {
            _isPaid: {
              equals: true,
            },
          },
          page,
          limit,
        });

        return {
          orders: allOrders,
          hasNextPage,
          hasPrevPage,
          nextPage: hasNextPage ? nextPage : null,
          prevPage: hasPrevPage ? prevPage : null,
        };
      } else {
        const {
          docs: userOrders,
          hasNextPage,
          hasPrevPage,
          nextPage,
          prevPage,
        } = await payload.find({
          collection: "orders",
          depth: 4,
          where: {
            user: {
              equals: typeof user === "string" ? user : user.id,
            },
            _isPaid: {
              equals: true,
            },
          },
          page,
          limit,
        });

        return {
          orders: userOrders,
          hasNextPage,
          hasPrevPage,
          nextPage: hasNextPage ? nextPage : null,
          prevPage: hasPrevPage ? prevPage : null,
        };
      }
    }),
  /* End of productRouter */
});
