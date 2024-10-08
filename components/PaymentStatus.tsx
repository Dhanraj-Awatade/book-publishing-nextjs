'use client'
import { Address } from '@/payload-types'
import { trpc } from '@/trpc/client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

interface PaymentStatusProps {
    orderUserName: string,
    orderId: string,
    isPaid: boolean
    isAnyPaperback: boolean
    orderAddress?: string | Address | null
}

const PaymentStatus = ({ orderUserName, orderId, isPaid, isAnyPaperback, orderAddress }: PaymentStatusProps) => {

    const router = useRouter()
    const { data } = trpc.payment.pullOrderStatus.useQuery(
        { orderId },
        {
            enabled: isPaid === false,
            refetchInterval: (data) => (data?.isPaid ? false : 1000)
        }
    )

    useEffect(() => {
        if (data?.isPaid) router.refresh()
    }, [data?.isPaid, router])

    return (
        <div className='mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600'>
            <div>
                <p className='font-medium text-gray-900'>{
                    isAnyPaperback ? "Shipping to" : "Added to library of"
                }</p>
                <p>{isAnyPaperback ? (typeof orderAddress === "object" ? `${orderAddress?.nickName}: ${orderAddress?.adressName}, ${orderAddress?.house}, ${orderAddress?.pin}, ${orderAddress?.state}` : orderAddress) : orderUserName}</p>
            </div>
            <div>
                <p className='font-medium text-gray-900'>Order Status</p>
                <p>{
                    isPaid
                        ? <span className='text-green-600'>Payment Successful</span>
                        : <span className='text-amber-800'>Payment Pending</span>
                }</p>
            </div>
        </div>
    )
}

export default PaymentStatus
