import { PRODUCT_CATEGORIES } from '@/lib/config'
import { useCart } from '@/lib/hooks/use-cart'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/payload-types'
import { ImageIcon, MinusIcon, PlusIcon, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '../ui/button'

const CartItem = ({ product, qty }: { product: Product, qty: number }) => {
    const { image } = product.images[0]
    const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label
    const { removeItem, addItem, clearCart } = useCart()

    return (
        <div className='space-y-3 py-2'>
            <div className='flex items-start justify-between gap-4'>
                <div className='flex items-center space-x-4'>
                    <div className='relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded'>
                        {typeof image !== 'string' && image.url
                            ? (
                                <Image src={image.url} alt={product.name} fill className='absolute object-cover' />
                            )
                            : (
                                <div className='flex h-full items-center justify-center bg-secondary'>
                                    <ImageIcon
                                        aria-hidden='true'
                                        className='h-4 w-4 text-muted-foreground'
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div className='flex flex-col self-start'>
                        <span className='line-clamp-1 text-sm font-medium mb-1'>
                            {product.name}
                        </span>
                        <span className='line-clamp-1 text-xs capitalize text-muted-foreground'>
                            {label}{" | "}{product.type}
                        </span>

                        <div className='mt-4 text-xs text-muted-foreground flex '>

                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 shrink-0 rounded-full m-2"
                                onClick={() => removeItem(product.id)}
                                disabled={qty === 0}
                            >
                                <MinusIcon className="h-4 w-4" />
                                <span className="sr-only">Decrease</span>
                            </Button>
                            <div className="text-xl font-bold tracking-tighter text-gray-900 text-center m-2">
                                {qty}
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="m-2 h-8 w-8 shrink-0 rounded-full"
                                onClick={() => addItem(product, qty + 1)}
                            // disabled={goal >= 400}
                            >
                                <PlusIcon className="h-4 w-4" />
                                <span className="sr-only">Increase</span>
                            </Button>


                        </div>
                        {/* <div>{qty}</div> */}
                    </div>
                </div>

                <div className='flex flex-col space-y-1 font-medium'>
                    <span className='ml-auto line-clamp-1 text-sm'>
                        {formatPrice(product.price)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CartItem
