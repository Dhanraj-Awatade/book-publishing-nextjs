import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getPayloadClient } from '@/lib/get-payload'
import React from 'react'

const page = async () => {
    const payload = await getPayloadClient()

    const { docs: orders } = await payload.find({
        collection: "orders",
        where: {
            _isPaid: {
                equals: true
            }
        }
    })

    const totalOrders = orders.length ?? 0
    const completedOrders = 0 //To-do:Implement logic here
    const pendingOrders = totalOrders - completedOrders

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
                                        of {totalOrders} orders.
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Progress value={pendingOrders * 100 / totalOrders} />
                                </CardFooter>
                            </Card>
                            <Card className='hidden sm:block bg-transparent border-transparent'>
                                <CardHeader className='pb-2'>
                                    <CardDescription></CardDescription>
                                    <CardTitle className='text-4xl text-red-900'></CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className='text-sm text-muted-foreground'>

                                    </div>
                                </CardContent>
                                <CardFooter>
                                    {/* <Progress value={pendingOrders * 100 / totalOrders} /> */}
                                </CardFooter>
                            </Card>
                            {/* </div> */}
                            <h1 className='text-4xl font-bold tracking-tight'>
                                Upcoming Orders
                            </h1>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead className='hidden sm:table-cell'>Payment Status</TableHead>
                                        <TableHead>Shipment Status</TableHead>
                                        <TableHead className='text-right'>Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order.id} className='bg-accent'>
                                            <TableCell>
                                                <div >
                                                    {typeof order.user === "string" ? `User ID: ${order.user}` : `${order.user.name} (${order.user.id})`}
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

        </MaxWidthWrapper>
    )
}

export default page
