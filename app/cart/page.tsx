"use client"
import { useCart } from '@/lib/hooks/use-cart'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CheckoutButton from '@/components/checkout/CheckoutButton'
import AddressDetails from '@/components/checkout/AddressDetails'
import { Separator } from '@/components/ui/separator'
import CheckOutProductList from '@/components/checkout/CheckOutProductList'
import { SHIPPING_CHARGES } from '@/lib/config/constants'
import { ScrollArea } from '@/components/ui/scroll-area'
import CourierSelection from '@/components/checkout/CourierSelection'
import OrderSummary from '@/components/checkout/OrderSummary'
import PaymentMethodSelection from '@/components/checkout/PaymentMethodSelection'

const Page = () => {

    const { items, removeItem, addItem, removeItemCompletely } = useCart()
    const productIds = items.map(({ product }) => product.id)
    const isAnyPaperback = items.flatMap(({ product }) => product.type).includes("paperback")
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [selectedAddress, selectAddress] = useState<{ id: string; house: string; state: string; pin: string; adressName: string; updatedAt: string; createdAt: string; road?: string | null | undefined; } | null | undefined>(/*addresses && addresses.at(0) ? addresses.at(0) :*/ null)
    const [isOverlay, setOverlay] = useState<boolean>(false)
    const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay")

    const cartPriceTotal = items.reduce((total, { product, productCount }) => total + (product.price * productCount), 0)
    const cartMrpTotal = items.reduce((total, { product, productCount }) => total + (product.mrp * productCount), 0)
    const totalItems = items.reduce((total, { productCount }) => total + productCount, 0)
    const [shippingCharges, setShippingCharges] = useState<number>(/*isAnyPaperback ? SHIPPING_CHARGES * totalItems :*/ 0)
    const totalAmount = cartPriceTotal + shippingCharges

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        console.log("paymentMethod:", paymentMethod)
    }, [paymentMethod])


    return (
        <div className='bg-white'>
            <div className={cn('mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8', { "hidden": isOverlay })}>
                <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                    Shopping Cart
                </h1>
                <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
                    <div className={cn(
                        "lg:col-span-7",
                        { "rounded-lg border-2 border-dashed border-zinc-200 p-12 lg:col-start-3": isMounted && items.length === 0, }
                    )}>
                        <h2 className='sr-only'>Items in your shopping cart</h2>
                        <ScrollArea className='rounded-lg border border-gray-700 px-4'>
                            <CheckOutProductList isMounted items={items} removeItem={removeItem} addItem={addItem} removeItemCompletely={removeItemCompletely} />
                        </ScrollArea>
                    </div>
                    {isAnyPaperback
                        ? <AddressDetails selectedAddress={selectedAddress} selectAddress={selectAddress} />
                        : null
                    }
                    <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-9 lg:col-start-2 lg:mt-4 lg:p-8'>

                        <Separator className='my-4 bg-black' />
                        <PaymentMethodSelection
                            isMounted={isMounted}
                            selectedAddress={selectedAddress}
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                            isAnyPaperback={isAnyPaperback}
                            setShippingCharges={setShippingCharges}
                        />

                        <Separator className='my-4 bg-black' />
                        <OrderSummary
                            totalAmount={totalAmount}
                            shippingCharges={shippingCharges}
                            isMounted={isMounted}
                            cartPriceTotal={cartPriceTotal}
                            cartMrpTotal={cartMrpTotal}
                        />
                        <div className='mt-6'>
                            {
                                <CheckoutButton
                                    totalAmount={totalAmount}
                                    isAnyPaperback={isAnyPaperback}
                                    selectedAddress={selectedAddress}
                                    productIds={productIds}
                                    cartItemCount={items.length}
                                    setOverlay={setOverlay}
                                />
                            }
                        </div>
                    </section>
                </div>
            </div>
            <div className={cn('flex justify-center items-center w-full h-screen', { "hidden": !isOverlay })}>
                <p>Awaiting payment status</p>
                <Loader2 className='h-4 w-4 mx-2 animate-spin' />
                <p className='text-amber-700'>Please do not go back or refresh this page</p>
            </div>
        </div >
    )
}

export default Page
