"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { formatPrice } from "@/lib/utils";
import { Product } from "@/payload-types";

import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import OrderStatusComponent from "./OrderStatusComponent";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import OrderCardComponent from "./OrderCardComponent";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";

const Orders = () => {
    const [cursor, setCursor] = useState<number>(1);

    const { data, isLoading, error, isError } =
        trpc.productProcedures.getOrders.useQuery(
            { cursor },
            {
                getNextPageParam: (lastPage) => lastPage.nextPage,
            }
        );

    const orders = data?.orders;
    const hasNextPage = data?.hasNextPage;
    const hasPrevPage = data?.hasPrevPage;
    const nextPage = data?.nextPage;
    const prevPage = data?.prevPage;

    // if (isError && error.message === "UNAUTHORIZED") redirect(`/error?message=${errorMessage}`)

    const totalOrders = orders ? orders.length : 0;
    const completedOrders = 0; //To-do:Implement logic here
    const shipmentStatus = true; // To-do: Implement shipment status
    const paidTotalOrders = orders ? orders.length : 0;

    // if (!user) throw new Error("Not Signed In")
    // else
    return (
        <MaxWidthWrapper>
            <div className="flex min-h-screen w-full bg-muted/40">
                <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
                    <div className="flex flex-col gap-16">
                        <OrderCardComponent
                            isLoading={isLoading}
                            completedOrders={completedOrders}
                            paidTotalOrders={paidTotalOrders}
                            totalOrders={totalOrders}
                        />
                        <div className="w-full mb-3">
                            <h1 className="text-4xl font-bold tracking-tight mb-3">
                                Upcoming Orders
                            </h1>

                            {isLoading ? (
                                <div className="flex flex-col w-full items-center justify-center">
                                    <Loader2 className="animate-spin h-24 w-24 text-slate-950" />
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Created on</TableHead>
                                            <TableHead /*className='hidden sm:table-cell'*/
                                            >
                                                Payment Status
                                            </TableHead>
                                            <TableHead>
                                                Shipment Status
                                            </TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead className="text-right">
                                                Address
                                            </TableHead>
                                            <TableHead className="text-right">
                                                Products
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            /*user.role === "customer" ? userOrders :*/ orders?.map(
                                                (order) => (
                                                    <TableRow
                                                        key={order.id}
                                                        className="bg-accent"
                                                    >
                                                        <TableCell>
                                                            <div>
                                                                {typeof order.user ===
                                                                "string" ? (
                                                                    <p>
                                                                        User ID:{" "}
                                                                        {
                                                                            order.user
                                                                        }
                                                                    </p>
                                                                ) : (
                                                                    <p>
                                                                        {
                                                                            order
                                                                                .user
                                                                                .name
                                                                        }{" "}
                                                                        <span className="text-muted-foreground">
                                                                            (
                                                                            {
                                                                                order
                                                                                    .user
                                                                                    .id
                                                                            }
                                                                            )
                                                                        </span>
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div>
                                                                <p>
                                                                    <span className="font-semibold">
                                                                        {order.createdAt.substring(
                                                                            0,
                                                                            10
                                                                        )}
                                                                    </span>{" "}
                                                                    (
                                                                    {order.createdAt.substring(
                                                                        11,
                                                                        19
                                                                    )}
                                                                    )
                                                                </p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div>
                                                                {order._isPaid ===
                                                                true ? (
                                                                    <span className="text-green-500 font-semibold">
                                                                        Paid
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-red-700 font-semibold">
                                                                        Not Paid
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div>
                                                                <OrderStatusComponent
                                                                    id={
                                                                        order.id
                                                                    }
                                                                />
                                                                {/*shipmentStatus ? <span className='text-green-500 font-semibold'>Delivered</span> : <span className='text-red-700 font-semibold'>Not Shipped</span>*/}{" "}
                                                                {/* To-do: Add more color conditions */}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div>
                                                                {formatPrice(
                                                                    order.amount
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="text-right">
                                                                {!order.address ? (
                                                                    <p className="text-muted-foreground">
                                                                        eBook
                                                                        Order
                                                                    </p>
                                                                ) : typeof order.address ===
                                                                  "string" ? (
                                                                    "Order depth not enough to get address"
                                                                ) : (
                                                                    <div>
                                                                        <p>
                                                                            {
                                                                                order
                                                                                    .address
                                                                                    .house
                                                                            }
                                                                            ,{" "}
                                                                        </p>
                                                                        {order
                                                                            .address
                                                                            .road ? (
                                                                            <p>
                                                                                {
                                                                                    order
                                                                                        .address
                                                                                        .road
                                                                                }

                                                                                ,{" "}
                                                                            </p>
                                                                        ) : null}
                                                                        <p>
                                                                            {
                                                                                order
                                                                                    .address
                                                                                    .state
                                                                            }
                                                                            {
                                                                                " - "
                                                                            }
                                                                        </p>
                                                                        <p>
                                                                            {
                                                                                order
                                                                                    .address
                                                                                    .pin
                                                                            }
                                                                            ,{" "}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="text-center">
                                                                {!order.products ? (
                                                                    <p className="text-muted-foreground">
                                                                        No
                                                                        Products
                                                                    </p>
                                                                ) : typeof order.products ===
                                                                  "string" ? (
                                                                    "Order depth not enough to get Product"
                                                                ) : (
                                                                    <div>
                                                                        <ol>
                                                                            {order.products.flatMap(
                                                                                (
                                                                                    prod,
                                                                                    i
                                                                                ) =>
                                                                                    typeof prod ===
                                                                                    "string" ? (
                                                                                        <li>
                                                                                            <p>
                                                                                                {i +
                                                                                                    1}
                                                                                                {
                                                                                                    ": "
                                                                                                }
                                                                                                Product
                                                                                                ID:{" "}
                                                                                                {
                                                                                                    <Link
                                                                                                        className="underline"
                                                                                                        href={`process.env.NEXT_PUBLIC_SERVER_URL/book/${prod}`}
                                                                                                    >
                                                                                                        {
                                                                                                            prod
                                                                                                        }
                                                                                                    </Link>
                                                                                                }
                                                                                            </p>
                                                                                        </li>
                                                                                    ) : (
                                                                                        <li>
                                                                                            <p>
                                                                                                {i +
                                                                                                    1}
                                                                                                {
                                                                                                    ": "
                                                                                                }
                                                                                                {
                                                                                                    <Link
                                                                                                        className="underline"
                                                                                                        href={`process.env.NEXT_PUBLIC_SERVER_URL/book/${prod.id}`}
                                                                                                    >
                                                                                                        {
                                                                                                            prod.name
                                                                                                        }
                                                                                                    </Link>
                                                                                                }
                                                                                            </p>
                                                                                        </li>
                                                                                    )
                                                                            )}
                                                                        </ol>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )
                                        }
                                    </TableBody>
                                </Table>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-x-4">
                        <Button
                            variant={"outline"}
                            disabled={isLoading || hasPrevPage === false}
                            onClick={() =>
                                setCursor(
                                    hasPrevPage && prevPage ? prevPage : 1
                                )
                            }
                        >
                            <ChevronLeft /> Prev Page
                        </Button>
                        <Button
                            variant={"outline"}
                            disabled={isLoading || hasNextPage === false}
                            onClick={() =>
                                setCursor(
                                    hasNextPage && nextPage ? nextPage : 1
                                )
                            }
                        >
                            Next Page <ChevronRight />
                        </Button>
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    );
};

export default Orders;

// interface DataTableProps<TData, TValue> {
//     columns: ColumnDef<TData, TValue>[]
//     data: TData[]
// }

// export function DataTable<TData, TValue>({
//     columns,
//     data,
// }: DataTableProps<TData, TValue>) {
//     const table = useReactTable({
//         data,
//         columns,
//         getCoreRowModel: getCoreRowModel(),

//     })
// }
