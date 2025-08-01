import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../lib/get-payload";
import shortid from "shortid";
import { Orders } from "razorpay/dist/types/orders";
import Razorpay from "razorpay";
import qs from "qs";
import { Address, User } from "../payload-types";
import { RAZORPAY_ORDER_COUNT_LIMIT } from "../lib/config/constants";

export const paymentRouter = router({
    createSession: privateProcedure
        .input(
            z.object({
                productIds: z.array(z.string()),
                addressId: z.string().or(z.null()),
                isAnyPaperback: z.boolean(),
                totalAmount: z.number(),
            })
        )
        .query(async ({ ctx, input }) => {
            const { user } = ctx;
            let { productIds, addressId, isAnyPaperback, totalAmount } = input;

            if (productIds.length === 0) {
                throw new TRPCError({ code: "BAD_REQUEST" });
            }

            const payload = await getPayloadClient();
            const razorpay = new Razorpay({
                key_id: `${process.env.RAZORPAY_ID}`,
                key_secret: `${process.env.RAZORPAY_KEY}`,
            });

            const { docs: products } = await payload.find({
                collection: "products",
                where: {
                    id: {
                        in: productIds,
                    },
                },
            });

            // const amount = products.reduce((total, { price }) => total + price, 0);

            const options = {
                amount: Math.round(totalAmount * 100),
                currency: "INR",
                // customer_id: user.id,
                payment_capture: true,
                receipt: shortid.generate(),
                notes: {
                    // These notes will be added to your transaction. So you can search it within their dashboard.
                    // Also, it's included in webhooks as well. So you can automate it.
                    userId: `${user.id}`,
                    userName: `${user.name}`,
                    addressId: `${addressId}`,
                    productIds: `${productIds}`,
                },
            };

            const razorpayOrder = razorpay.orders.create(options);

            // if (!razorpayOrder) console.log("Razorpay Order Not Created");
            // else {
            //   console.log("Razorpay Order on server: ", razorpayOrder);
            // }

            const order: Orders.RazorpayOrder = await razorpayOrder;

            if (isAnyPaperback) {
                const payloadOrder = await payload.create({
                    collection: "orders",
                    data: {
                        id: order.id,
                        _isPaid: false,
                        products: products.map((prod) => prod.id) as string[],
                        user: user.id,
                        razorpayOrderId: order.id,
                        address: addressId,
                        amount: totalAmount,
                    },
                });
            } else {
                const payloadOrder = await payload.create({
                    collection: "orders",
                    data: {
                        id: order.id,
                        _isPaid: false,
                        products: products.map((prod) => prod.id) as string[],
                        user: user.id,
                        razorpayOrderId: order.id,
                        amount: totalAmount,
                    },
                });
            }
            // console.log("Payload Order Created: ", payloadOrder);

            const keyId = process.env.RAZORPAY_ID;
            const orderOptions: { key: string; name: string; email: string } = {
                key: keyId as string,
                name: user.name,
                email: user.email,
            };

            // const payloadOrderId = payloadOrder.id;
            // const productArray = products.map((prod) => prod.id) as string[];
            // const userId = user.id;

            return {
                order,
                orderOptions /*, productArray, userId payloadOrderId*/,
            };
        }),

    //************************************************************************************************************** */

    addProductToUser: privateProcedure
        .input(z.string().or(z.null()))
        .query(async ({ input, ctx }) => {
            const { user } = ctx;
            if (!user) return "Not Signed In";

            let orderId = input;
            if (orderId === null) return null;

            const payload = await getPayloadClient();

            // const existingUserProductIds = user.products!.map((prod) => {
            //   if (typeof prod === "string") return prod;
            //   else return prod.id;
            // });

            const { docs: orders } = await payload.find({
                collection: "orders",
                depth: 3,
                where: {
                    user: {
                        equals: user.id,
                    },
                    _isPaid: {
                        equals: true,
                    },
                },
            });

            const purchasedProductIdsArray = orders
                .flatMap(({ products }) => products)
                .flatMap((prod) => {
                    if (typeof prod === "string") return prod;
                    else return prod.id;
                });
            // .filter((prod) => prod !== null);

            const purchasedProductIds = Array.from(
                new Set(purchasedProductIdsArray)
            );

            // const [order] = orders;
            // const orderProductIds = order.products.map((prod) => {
            //   if (typeof prod === "string") return prod;
            //   else return prod.id;
            // });
            // console.log("Order on Server", order);
            // // if (!order) return null;
            // // if (order._isPaid === false) console.log("Not Paid");

            // // const orderProducts = order.products;
            // const productsToAdd = Array.from(
            //   new Set([...orderProductIds, ...existingUserProductIds])
            // );

            if (purchasedProductIds) {
                const addProductToUserQuery = qs.stringify(
                    {
                        where: {
                            id: {
                                equals: user.id,
                            },
                        },
                    },
                    { addQueryPrefix: true }
                );

                // console.log(
                //   "JSON Object: ",
                //   JSON.stringify({
                //     products: purchasedProductIds,
                //   })
                // );

                try {
                    const req = await fetch(
                        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${addProductToUserQuery}`,
                        {
                            method: "PATCH",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                products: purchasedProductIds,
                            }),
                        }
                    );
                    const data = await req.json();
                    console.log("Added Product to User Account Successfully");
                    return data as User;
                } catch (err) {
                    console.log("Adding Product to user failed:", err);
                }
                //   const { docs: updatedUser } = await payload.update({
                //     collection: "users",
                //     depth: 1,
                //     where: {
                //       id: {
                //         equals: user.id,
                //       },
                //     },
                //     data: {
                //       // products: Array.from(new Set([...orderProducts])),
                //       products: productsToAdd,
                //     },
                //   });

                //   console.log(
                //     // "Fetched User:",
                //     // fetchedUser,
                //     "Products to Add",
                //     productsToAdd,
                //     "Updated User On Server",
                //     updatedUser
                //   );
                //   return updatedUser;
            }
        }),

    //************************************************************************************************************** */
    pullOrderStatus: privateProcedure
        .input(z.object({ orderId: z.string() }))
        .query(async ({ input }) => {
            const { orderId } = input;

            const payload = await getPayloadClient();

            const { docs: orders } = await payload.find({
                collection: "orders",
                where: {
                    id: {
                        equals: orderId,
                    },
                },
            });

            if (!orders.length) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            const [order] = orders;
            return { isPaid: order._isPaid };
        }),

    //************************************************************************************************************** */
    saveAddressToUser: privateProcedure
        .input(
            z.object({
                name: z.string(),
                house: z.string(),
                road: z.string().optional(),
                state: z.string(),
                pin: z.string(),
                nickname: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { house, pin, road, state, name, nickname } = input;
            const { user } = ctx;
            const userId = user.id as string;
            const payload = await getPayloadClient();

            const definedRoad = typeof road === "undefined" ? null : road;
            const updatedAddress: {
                adressName: string;
                house: string;
                road: string | null;
                pin: string;
                state: string;
                user: string;
                nickName: string;
            } = {
                adressName: name,
                house,
                road: definedRoad,
                pin,
                state,
                user: userId,
                nickName: nickname,
            };

            const address = await payload.create({
                collection: "addresses",
                data: updatedAddress,
            });
            // // const [user] = users;

            // const addAddressToUserQuery = qs.stringify(
            //   {
            //     where: {
            //       id: {
            //         equals: user.id,
            //       },
            //     },
            //   },
            //   { addQueryPrefix: true }
            // );

            // let existingUserAddressIds: string[] = [];

            // try {
            //   if (user.addresses) {
            //     existingUserAddressIds = ctx.user.addresses!.flatMap((addr) =>
            //       typeof addr === "string" ? addr : addr.id
            //     );
            //   }
            //   const addressIdsToAdd = [...existingUserAddressIds, address.id];
            //   // console.log("addresstoadd:", addressIdsToAdd);
            //   const req = await fetch(
            //     `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${addAddressToUserQuery}`,
            //     {
            //       method: "PATCH",
            //       credentials: "include",
            //       headers: {
            //         "Content-Type": "application/json",
            //       },
            //       body: JSON.stringify({
            //         addresses: addressIdsToAdd,
            //       }),
            //     }
            //   );
            //   const data = await req.json();
            //   console.log("Updated User on server", data);
            //   return user.addresses as Address[];
            // } catch (err) {
            //   console.log("Adding Address to user failed:", err);
            // }
        }),
    //************************************************************************************************************** */
    fetchUserAddresses: privateProcedure.query(async ({ ctx }) => {
        const { user } = ctx;
        // if (!user.addresses) return null;
        // const addresses = user.addresses
        //   .map((addr) => (typeof addr !== "string" ? addr : null))
        //   .filter((addr): addr is Address => addr !== null);

        const payload = await getPayloadClient();
        const { docs: addresses } = await payload.find({
            collection: "addresses",
            where: {
                user: { equals: user.id },
            },
        });
        // console.log(addresses);
        return addresses;
    }),
    //************************************************************************************************************** */
    // ToDo: Implement refreshing all orders
    refreshAllRazorpayOrders: privateProcedure
        .input(z.object({ condition: z.boolean(), page: z.number() }))
        .query(async ({ ctx, input }) => {
            if (ctx.user.role != "admin") {
                console.error(
                    "User not an Admin to refresh All Orders. Please login as an Admin."
                );
                return;
            }

            const isPaid = input.condition;
            const page = input.page;
            const payload = await getPayloadClient();

            const {
                docs: orders,
                totalPages,
                hasNextPage,
                hasPrevPage,
            } = await payload.find({
                page: page,
                limit: RAZORPAY_ORDER_COUNT_LIMIT,
                collection: "orders",
                where: {
                    _isPaid: { equals: isPaid },
                },
            });

            try {
                const token = btoa(
                    `${process.env.RAZORPAY_ID}:${process.env.RAZORPAY_KEY}`
                );
                const myHeaders = new Headers();
                myHeaders.append("Authorization", `Basic ${token}`);

                // const res = await fetch(/*"https://api.razorpay.com/v1/orders?"*/ "", {
                //     method: "GET",
                //     headers: myHeaders,
                // });
                // const razorpayOrders = await res.json();
                // return { razorpayOrders: razorpayOrders, unpaidOrders: orders };

                const refreshedRazorpayOrders = orders.flatMap(
                    async (order) => {
                        const res = await fetch(
                            `https://api.razorpay.com/v1/orders/${order.razorpayOrderId}`,
                            {
                                method: "GET",
                                headers: myHeaders,
                            }
                        );
                        const razorpayOrder = await res.json();
                        return [order.id, razorpayOrder];
                    }
                );
                return {
                    refreshedRazorpayOrders,
                    totalPages,
                    hasNextPage,
                    hasPrevPage,
                };
            } catch (error) {
                console.log("Error while getting Razorpay Orders: ", error);
            }
            return;
        }),

    //************************************************************************************************************** */
    refreshUserRazorpayOrders: privateProcedure
        .input(z.boolean())
        .query(async ({ ctx, input }) => {
            const signedUser: User = ctx.user;
            const isPaid = input;
            const payload = await getPayloadClient();

            const { docs: orders } = await payload.find({
                collection: "orders",
                where: {
                    user: {
                        equals: signedUser,
                    },
                    _isPaid: { equals: isPaid },
                },
            });

            try {
                const token = btoa(
                    `${process.env.RAZORPAY_ID}:${process.env.RAZORPAY_KEY}`
                );
                const myHeaders = new Headers();
                myHeaders.append("Authorization", `Basic ${token}`);
                const refreshedRazorpayOrders = orders.map(async (order) => {
                    const res = await fetch(
                        `https://api.razorpay.com/v1/orders/${order.razorpayOrderId}`,
                        {
                            method: "GET",
                            headers: myHeaders,
                        }
                    );
                    const razorpayOrder = await res.json();
                    return [order.id, razorpayOrder];
                });
                return { razorpayOrders: refreshedRazorpayOrders };
            } catch (error) {
                console.log("Error while getting Razorpay Orders: ", error);
            }
            return;
        }),
});
