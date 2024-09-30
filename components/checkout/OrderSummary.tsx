import { formatPrice } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface OrderSummaryProps {
    isMounted: boolean
    cartMrpTotal: number
    cartPriceTotal: number
    shippingCharges: number
    totalAmount: number
}

const OrderSummary = ({ isMounted, cartMrpTotal, cartPriceTotal, shippingCharges, totalAmount }: OrderSummaryProps) => {

    return (
        <>
            <h2 className='text-lg font-medium text-gray-900 mt-4'>Order Summary</h2>
            <div className='mt-6 space-y-4'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm text-gray-600'>Subtotal</p>
                    <p className='text-sm font-medium text-gray-900'>
                        {
                            isMounted
                                ? <>
                                    <span className='mr-1 line-through text-xs font-normal text-gray-400'>{formatPrice(cartMrpTotal)}</span>
                                    {formatPrice(cartPriceTotal)}
                                </>

                                : (
                                    <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                                )
                        }
                    </p>
                </div>
                <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                    <div className='flex items-center text-sm text-muted-foreground'>
                        <span>Shipping Charges</span>
                    </div>
                    <div className='text-sm font-medium text-gray-900'>
                        {isMounted
                            ? formatPrice(shippingCharges)
                            : (
                                <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                            )}
                    </div>
                </div>
                <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                    <div className='flex items-center text-sm text-green-700'>
                        <span className='mr-2'>Total saved</span>
                        <Image src={"/Images/party_popper.png"} alt='party popper icon' width={20} height={20} />
                    </div>
                    <div className='text-sm font-medium text-green-700'>
                        {isMounted
                            ? formatPrice(cartMrpTotal - cartPriceTotal)
                            : (
                                <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                            )}
                    </div>
                </div>
                <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                    <div className='text-base font-medium text-gray-900'>Order Total</div>
                    <div className='text-base font-medium text-gray-900'>
                        {
                            isMounted
                                ? formatPrice(totalAmount)
                                : (
                                    <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderSummary
