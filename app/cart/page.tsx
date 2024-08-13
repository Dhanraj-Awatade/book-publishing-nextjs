"use client"
// import FetchServerOrder from '@/components/FetchServerOrder'
// Done:(COMPLETED) Seperate Payments in Server Side Component "FetchServerOrder"
import { Button } from '@/components/ui/button'
import { PRODUCT_CATEGORIES } from '@/lib/config'
import { useCart } from '@/lib/hooks/use-cart'
import initiatePayment from '@/components/checkout/CheckoutButton'
import { cn, formatPrice } from '@/lib/utils'
import { trpc } from '@/trpc/client'
import { Check, Loader2, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CheckoutButton from '@/components/checkout/CheckoutButton'
import AddressDetails from '@/components/checkout/AddressDetails'
import { Separator } from '@/components/ui/separator'
import { Address } from '@/payload-types'
import CheckOutProductList from '@/components/checkout/CheckOutProductList'


const Page = () => {

    const { items, removeItem, addItem, removeItemCompletely } = useCart()
    const productIds = items.map(({ product }) => product.id)
    const isAnyPaperback = items.flatMap(({ product }) => product.type).includes("paperback")
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [selectedAddress, selectAddress] = useState<{ id: string; house: string; state: string; pin: string; adressName: string; updatedAt: string; createdAt: string; road?: string | null | undefined; } | null | undefined>(/*addresses && addresses.at(0) ? addresses.at(0) :*/ null)

    const cartPriceTotal = items.reduce((total, { product, productCount }) => total + (product.price * productCount), 0)
    const cartMrpTotal = items.reduce((total, { product, productCount }) => total + (product.mrp * productCount), 0)
    const shippingCharges = isAnyPaperback ? 1 : 0

    useEffect(() => {
        setIsMounted(true)
    }), []


    return (
        <div className='bg-white'>
            <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
                <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                    Shopping Cart
                </h1>
                <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
                    <div className={cn(
                        "lg:col-span-7",
                        { "rounded-lg border-2 border-dashed border-zinc-200 p-12": isMounted && items.length === 0, }
                    )}>
                        <h2 className='sr-only'>Items in your shopping cart</h2>

                        <CheckOutProductList isMounted items={items} removeItem={removeItem} addItem={addItem} removeItemCompletely={removeItemCompletely} />

                    </div>
                    {isAnyPaperback
                        ? <AddressDetails selectedAddress={selectedAddress} selectAddress={selectAddress} />
                        : null
                    }
                    <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-9 lg:col-start-2 lg:mt-0 lg:p-8'>
                        <Separator className='my-4 bg-black' />
                        <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>
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
                                            ? formatPrice(cartPriceTotal + shippingCharges)
                                            : (
                                                <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='mt-6'>
                            {/* <Button
                                disabled={items.length === 0}
                                className='w-full'
                                size='lg'
                                onClick={() => initiatePayment({ productIds }) /*createRazorpaySession(orderOptions)> */}


                            {/*(!isLoading) && *//*  isMounted
                                    ? "Checkout"
                                    : (<Loader2 className='h-4 w-4 animate-spin ml-1.5' />)}
                            </Button> */}
                            {
                                <CheckoutButton isAnyPaperback={isAnyPaperback} selectedAddress={selectedAddress} productIds={productIds} cartItemCount={items.length} />
                            }
                        </div>
                    </section>
                </div>
            </div>
        </div >
    )
}

export default Page
