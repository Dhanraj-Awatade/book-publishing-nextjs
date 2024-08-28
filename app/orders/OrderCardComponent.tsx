import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Loader2 } from 'lucide-react'

interface OrderCardComponentProps {
    completedOrders: number,
    totalOrders: number,
    paidTotalOrders: number,
    isLoading: boolean
}

const OrderCardComponent = ({ isLoading, completedOrders, totalOrders, paidTotalOrders }: OrderCardComponentProps) => {

    const pendingOrders = totalOrders - completedOrders
    const paidPendingOrders = paidTotalOrders - completedOrders

    return (
        <div className='grid gap-4 sm:grid-cols-2'>
            {/* <div className=''> */}
            <Card>
                <CardHeader className='pb-2'>
                    <CardDescription>Pending Orders</CardDescription>
                    <CardTitle className='text-4xl text-red-900'>
                        {isLoading
                            ? <Loader2 className='h-4 w-4 text-muted-foreground animate-spin content-center' />
                            : pendingOrders
                        }
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='text-sm text-muted-foreground'>
                        of total{" "}
                        {isLoading
                            ? 0
                            : totalOrders
                        }
                        {" "}order(s).
                    </div>
                </CardContent>
                <CardFooter>
                    <Progress value={pendingOrders * 100 / totalOrders} />
                </CardFooter>
            </Card>
            <Card /*className='hidden sm:block bg-transparent border-transparent'*/ >
                <CardHeader className='pb-2'>
                    <CardDescription>Pending Orders</CardDescription>
                    <CardTitle className='text-4xl text-red-900'>
                        {isLoading
                            ? <Loader2 className='h-4 w-4 text-muted-foreground animate-spin content-center' />
                            : paidPendingOrders
                        }
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='text-sm text-muted-foreground'>
                        of{" "}<span className='text-green-400'>{isLoading
                            ? 0
                            : paidTotalOrders
                        } paid{" "}</span>order(s).
                    </div>
                </CardContent>
                <CardFooter>
                    <Progress value={paidPendingOrders * 100 / paidTotalOrders} />
                </CardFooter>
            </Card>
            {/* </div> */}
        </div>
    )
}

export default OrderCardComponent
