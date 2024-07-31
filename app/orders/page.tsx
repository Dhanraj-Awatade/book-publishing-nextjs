import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getPayloadClient } from '@/lib/get-payload'
import { getServerSideUser } from '@/lib/payload-utils'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/payload-types'
import { cookies } from 'next/headers'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import OrderStatusComponent from './OrderStatusComponent'
import { ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'

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

const page = async () => {
    const nextCookies = cookies()
    const user = await getServerSideUser(nextCookies)

    const errorMessage = 'You are not Authorized to view this page. Please sign in with an admin account.'
    console.log(user)
    if (!user) redirect(`/error?message=${errorMessage}`)

    const payload = await getPayloadClient()

    const { docs: userOrders } = await payload.find({
        collection: "orders",
        depth: 4,
        where: {
            user: {
                equals: typeof user === 'string' ? user : user?.id
            }
        }
    })

    const { docs: allOrders } = await payload.find({
        collection: "orders",
        depth: 4,
        // where: {
        //     user: {
        //         equals: true
        //     }
        // }
    })

    // const userOrders = allOrders
    const totalOrders = user?.role === "customer" ? userOrders.length ?? 0 : allOrders.length ?? 0
    const completedOrders = 0 //To-do:Implement logic here
    const pendingOrders = totalOrders - completedOrders
    const shipmentStatus = true // To-do: Implement shipment status
    const paidTotalOrders = user?.role === "customer" ? userOrders.filter(({ _isPaid }) => _isPaid === true).length ?? 0 : allOrders.filter(({ _isPaid }) => _isPaid === true).length ?? 0
    const paidPendingOrders = paidTotalOrders - completedOrders


    return (
        <MaxWidthWrapper>
            <div className='flex min-h-screen w-full bg-muted/40'>

                <div className='max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4'>
                    <div className='flex flex-col gap-16'>
                        <div className='grid gap-4 sm:grid-cols-2'>
                            {/* <div className=''> */}
                            <Card>
                                <CardHeader className='pb-2'>
                                    <CardDescription>Pending Orders</CardDescription>
                                    <CardTitle className='text-4xl text-red-900'>{pendingOrders}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-sm text-muted-foreground'>
                                        of total {totalOrders} order(s).
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={pendingOrders * 100 / totalOrders} />
                                </CardFooter>
                            </Card>
                            <Card /*className='hidden sm:block bg-transparent border-transparent'*/ >
                                <CardHeader className='pb-2'>
                                    <CardDescription>Pending Orders</CardDescription>
                                    <CardTitle className='text-4xl text-red-900'>{paidPendingOrders}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-sm text-muted-foreground'>
                                        of <span className='text-green-400'>{paidTotalOrders} paid{" "}</span>order(s).
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={paidPendingOrders * 100 / paidTotalOrders} />
                                </CardFooter>
                            </Card>
                            {/* </div> */}
                        </div>
                        <div className='w-full mb-3'>
                            <h1 className='text-4xl font-bold tracking-tight mb-3'>
                                Upcoming Orders
                            </h1>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Created on</TableHead>
                                        <TableHead /*className='hidden sm:table-cell'*/>Payment Status</TableHead>
                                        <TableHead>Shipment Status</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead className='text-right'>Address</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {(user?.role === "customer" ? userOrders : allOrders).map((order) => (
                                        <TableRow key={order.id} className='bg-accent'>
                                            <TableCell>
                                                <div >
                                                    {typeof order.user === "string" ? <p>User ID: {order.user}</p> : <p>{order.user.name} <span className='text-muted-foreground'>({order.user.id})</span></p>}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div >
                                                    <p><span className='font-semibold'>{order.createdAt.substring(0, 10)}</span>{" "}({order.createdAt.substring(11, 19)})</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div >
                                                    {order._isPaid === true ? <span className='text-green-500 font-semibold'>Paid</span> : <span className='text-red-700 font-semibold'>Not Paid</span>}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div >
                                                    <OrderStatusComponent id={order.id} />
                                                    {/*shipmentStatus ? <span className='text-green-500 font-semibold'>Delivered</span> : <span className='text-red-700 font-semibold'>Not Shipped</span>*/} {/* To-do: Add more color conditions */}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div >
                                                    {formatPrice(order.amount)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className='text-right'>
                                                    {!order.address
                                                        ? <p className='text-muted-foreground'>eBook Order</p>
                                                        : (
                                                            typeof order.address === "string"
                                                                ? "Order depth not enough to get address"
                                                                : <div>
                                                                    <p>{order.address.house},{" "}</p>
                                                                    {order.address.road ? <p>{order.address.road},{" "}</p> : null}
                                                                    <p>{order.address.state}{" - "}</p>
                                                                    <p>{order.address.pin},{" "}</p>
                                                                </div>
                                                        )
                                                    }
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                    </div>
                    {/* <ul>
                        {orders.map(({ id }) => { return (<li>{id}</li>) })}
                    </ul> */}
                </div>
            </div>

        </MaxWidthWrapper >
    )
}

export default page
