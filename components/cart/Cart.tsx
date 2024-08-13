"use client"

import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { ShoppingCart } from 'lucide-react'
import { Separator } from '../ui/separator';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import Image from 'next/image';
import { useCart } from '@/lib/hooks/use-cart';
import { ScrollArea } from '../ui/scroll-area';
import CartItem from './CartItem';

const Cart = () => {
    const { items, clearCart } = useCart()
    const itemCount = items.reduce((total, { productCount }) => total + productCount, 0);
    // const itemCount = items.reduce((total, { qty }) => total + qty, 0)
    const fee = 1;

    const cartTotal = items.reduce((total, { product, productCount }) => total + (product?.price * productCount), 0)
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return <Sheet>
        <SheetTrigger className='group -m-2 p-2 flex items-center'>
            <ShoppingCart aria-hidden='true' className='h-6 w-6 flex-shrink-0 text-gray-600 group-hover:text-gray-950 ' />
            <span className='ml-2 text-sm text-gray-700 group-hover:text-gray-950'>
                {isMounted ? itemCount : 0}
            </span>
        </SheetTrigger>
        <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
            <SheetHeader className='space-y-2.5 pr-6'>
                <SheetTitle>Cart({itemCount})</SheetTitle>
            </SheetHeader>
            {itemCount > 0
                ? (
                    <>
                        <div className='flex w-full flex-col pr-6'>
                            <ScrollArea>
                                {
                                    items.map(
                                        ({ product, productCount }) => (
                                            <CartItem product={product} key={product?.id} qty={productCount} />
                                        )
                                    )
                                }
                            </ScrollArea>
                        </div>
                        <div className='space-y-4 pr-6'>
                            <div className='space-y-1.5 pr-6'>
                                <Separator />
                                {/* <div className='flex'>
                                    <span className='flex-1'>Shipping</span>
                                    <span>Free</span>
                                </div> */}
                                {/* <div className='flex'>
                                    <span className='flex-1'>Charges</span>
                                    <span>{formatPrice(fee)}</span>
                                </div> */}
                                <div className='flex'>
                                    <span className='flex-1 text-muted-foreground'>Total</span>
                                    <span className='font-bold'>{formatPrice(cartTotal)}</span>
                                </div>
                            </div>
                            <SheetFooter >
                                <SheetTrigger asChild>
                                    <Button variant={"destructive"} onClick={clearCart}>Clear Cart</Button>
                                </SheetTrigger>
                                <SheetTrigger asChild>
                                    <Link href='/cart' className={buttonVariants({
                                        className: 'w-full',
                                    })}>
                                        Continue To Checkout
                                    </Link>
                                </SheetTrigger>
                            </SheetFooter>
                        </div>
                    </>
                )
                : (
                    <div className='flex h-full justify-center flex-col items-center space-y-1'>
                        <div aria-hidden='true' className='relative mb-4 h-60 w-60 text-muted-foreground'>
                            <Image src={'/Images/hippo-empty-cart.png'} alt='Empty Cart Image' fill />
                        </div>
                        <span className='text-2xl font-semibold'>Yamptee Cart!</span>
                        <SheetTrigger asChild>
                            <Link href='/books' className={buttonVariants({
                                variant: "link",
                                size: "sm",
                                className: "text-sm text-muted-foreground"
                            })}>
                                Click here to add something to your Cart
                            </Link>
                        </SheetTrigger>
                    </div>
                )
            }
        </SheetContent>
    </Sheet>
}

export default Cart
Cart