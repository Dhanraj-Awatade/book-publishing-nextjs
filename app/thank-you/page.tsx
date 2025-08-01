import { getServerSideUser } from '@/lib/payload-utils'
import Image from 'next/image'
import React from 'react'
import { cookies } from 'next/headers'
import { getPayloadClient } from '@/lib/get-payload'
import { notFound, redirect, } from 'next/navigation'
import { Product, ProductFile, User } from '@/payload-types'
import { PRODUCT_CATEGORIES } from '@/lib/config'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import PaymentStatus from '@/components/PaymentStatus'

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const ThankYouPage = async ({ searchParams }: PageProps) => {

    // const searchParams = useSearchParams()
    const orderId = searchParams.orderId
    const isAnyPaperback = searchParams.isAnyPaperback === "true"
    const nextCookies = cookies()
    const payload = await getPayloadClient()

    const user = await getServerSideUser(nextCookies)
    // console.log("Signed User:", user);

    const { docs: orders } = await payload.find({
        collection: 'orders',
        depth: 2,
        where: {
            razorpayOrderId: {
                equals: orderId
            }
        }
    })

    const [order] = orders

    if (!order) return notFound()

    const orderUserId = typeof order.user === 'string'
        ? order.user
        : order.user.id

    if (orderUserId !== user?.id) {
        const message = "Access denied. This order does not belong to you."
        redirect(`/error?message=${message}`)
        // return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`)
    }

    const products = order.products as Product[]
    const orderTotal = products.reduce((total, product) => {
        return total + product.price
    }, 0)

    return (
        <main className='relative lg:max-h-full'>
            <div className='h-96 w-screen mt-4 relative overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12'>
                <Image fill src='/Images/checkout-thank-you.jpg' className='h-full w-full object-contain object-center' alt='Thank You Image' />
            </div>
            <div>
                <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24'>
                    <div className='lg:col-start-2'>
                        <p className='text-sm font-medium text-blue-600'>Order Successful</p>
                        <h1 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl' >Thank You for the purchase</h1>

                        {
                            order._isPaid
                                ?
                                <p className='mt-2 text-base text-muted-foreground'>
                                    Your order has been processed{
                                        isAnyPaperback ?
                                            <span>. The product will be shipped soon to your provided address.</span>
                                            : <span>{" "}& the product has been added to your library.</span>
                                    }
                                    We&apos;ve sent your order details & receipt to
                                    {
                                        typeof order.user !== 'string'
                                            ? (<span className='font-medium text-gray-900'>{" "}{order.user.email}</span>)
                                            : null
                                    }
                                    .
                                </p>

                                : <p className='mt-2 text-base text-muted-foreground' >
                                    Thank you for ordering from us. We are currently processing your Order.
                                    We will get back to you shortly.
                                </p>
                        }
                        <div className='mt-16 text-sm font-medium' >
                            <div className='text-muted-foreground'>
                                Order Number:
                            </div>
                            <div className='mt-2 text-gray-900'>
                                {order.id}
                            </div>

                            <ul className='mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground'>
                                {(order.products as Product[]).map((product) => {
                                    const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label
                                    //To-DO: Create a new database table to store the book if order is successful & modify Thank-you Page accordingly.
                                    // const readerUrl = (product.product_files as ProductFile).url as string
                                    const { image } = product.images[0]
                                    return <li key={product.id} className='flex space-x-6 py-6'>
                                        <div className='relative h-24 w-24'>
                                            {typeof image !== "string" && image.url
                                                ? (
                                                    <Image
                                                        fill
                                                        src={image.url}
                                                        alt={`${product.name} image`}
                                                        className='flex-none rounded-md bg-gray-100 object-cover object-center'
                                                    />
                                                )
                                                : null
                                            }
                                        </div>
                                        <div className='flex-auto flex flex-col justify-between'>
                                            <div className='space-y-1'>
                                                <h3 className='text-gray-900'>{product.name}</h3>
                                                <p className='my-1'>Category: {label}</p>
                                            </div>
                                            {
                                                order._isPaid && !isAnyPaperback
                                                    // true
                                                    ? (
                                                        <Link
                                                            href='/library'
                                                            className={cn(buttonVariants({ variant: "default" }))}
                                                        >View in Library
                                                        </Link>
                                                    )
                                                    : null
                                            }
                                        </div>
                                        <p className='flex-none font-medium text-gray-900'>
                                            {formatPrice(product.price)}
                                        </p>
                                    </li>
                                })}
                            </ul>
                            <div className='space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground'>
                                <div className='flex justify-between'>
                                    <p>Subtotal</p>
                                    <p className='text-gray-900'>{formatPrice(orderTotal)}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p>Transaction Fee</p>
                                    <p className='text-gray-900'>{formatPrice(1)}</p>
                                </div>
                                <div className='flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900'>
                                    <p className='text-base'>Total</p>
                                    <p className='text-base'>{formatPrice(orderTotal + 1)}</p>
                                </div>

                                <PaymentStatus isAnyPaperback={isAnyPaperback} isPaid={order._isPaid} orderUserName={(order.user as User).name} orderAddress={order.address} orderId={order.id} />

                                <div className='mt-16 border-t border-gray-200 py-6 text-right'>
                                    <Link href='/books' className='text-sm font-medium text-blue-600 hover:text-blue-500'>
                                        Continue Shopping &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default ThankYouPage
