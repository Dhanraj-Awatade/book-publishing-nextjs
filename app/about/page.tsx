// import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import React from "react";

// const About = async () => {
//     return (
//         <MaxWidthWrapper>
//             <div className="flex-col flex items-center justify-center my-auto min-h-lg bg-red-900  w-full">
//                 <div>About</div>
//             </div>
//         </MaxWidthWrapper>
//     );
// };

"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { trpc } from "@/trpc/client";
import React, { useEffect, useState } from "react";

const About = () => {
    const [page, setPage] = useState<number>(1);

    const { data: refreshedOrders, refetch } =
        trpc.payment.refreshAllRazorpayOrders.useQuery(
            { condition: true, page },
            { enabled: false }
        );

    const orders = refreshedOrders?.refreshedRazorpayOrders;
    const hasNextPage = refreshedOrders?.hasNextPage;
    const totalPages = refreshedOrders?.totalPages;
    const hasPrevPage = refreshedOrders?.hasPrevPage;

    // console.log("System Unpaid Orders: ", refreshOrders?.unpaidOrders);

    // console.log("Razorpay Paid Orders: ", refreshedOrders?.razorpayOrders);

    return (
        <MaxWidthWrapper>
            <div className="flex-col flex items-center justify-center my-auto min-h-lg bg-red-900  w-full">
                {/* <div>                </div> */}
                <Button onClick={() => refetch()}>Refresh Orders</Button>
                {!orders ? (
                    <p>Orders Empty</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>System Order ID</TableHead>
                                <TableHead>Razorpay Order ID</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => {
                                return <p>{}</p>;
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>
        </MaxWidthWrapper>
    );
};

export default About;
