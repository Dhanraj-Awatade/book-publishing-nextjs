import { PRODUCT_CATEGORIES } from '@/lib/config'
import { cn, formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Check, MinusIcon, PlusIcon, X } from 'lucide-react'
import { CartItem } from '@/lib/hooks/use-cart'
import { Product } from '@/payload-types'

interface CheckOutProductListProps {
    isMounted: boolean
    removeItem: (productId: string) => void
    items: CartItem[]
    addItem: (product: Product, productCount: number) => void
    removeItemCompletely: (productId: string) => void
}

const CheckOutProductList = ({ isMounted, items, removeItem, addItem, removeItemCompletely }: CheckOutProductListProps) => {
    return (
        <div className='lg:max-h-96'>
            {
                isMounted && items.length === 0
                    ? (
                        <div className='flex h-full flex-col items-center justify-center space-y-1'>
                            <div aria-hidden='true' className='relative mb-4 h-40 w-40 text-muted-foreground'>
                                <Image src='/Images/hippo-empty-cart.png' alt='empty cart image' loading='eager' fill />
                            </div>
                            <h3 className='font-semibold text-2xl'>Your Cart is Empty</h3>
                            <p className='text-muted-foreground text-center'>
                                Whoops! Nothing to show here.
                            </p>
                        </div>
                    )
                    : null}

            <ul className={cn({
                "divide-y divide-gray-200 border-b border-t border-gray-200": isMounted && items.length > 0
            })}>
                {
                    isMounted && items.map(({ product, productCount }) => {
                        const label = PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label
                        const { image } = product.images[0]

                        return (
                            <li key={product.id} className='flex py-6 sm:py-10'>
                                <div className='flex-shrink-0'>
                                    <div className='relative h-24 w-24'>
                                        {
                                            typeof image !== 'string' && image.url
                                                ? (
                                                    <Image
                                                        fill
                                                        src={image.url}
                                                        alt='product image'
                                                        className='h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48'
                                                    />
                                                )
                                                : null
                                        }
                                    </div>
                                </div>
                                <div className='ml-4 flex-col flex justify-between flex-1 sm:ml-6'>
                                    <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                                        <div>
                                            <div className='flex justify-between'>
                                                <h3 className='text-sm'>
                                                    <Link
                                                        className='font-medium text-gray-700 hover:text-gray-800'
                                                        href={`/books/${product.id}`}
                                                    >{product.name}</Link>
                                                </h3>
                                            </div>
                                            <div className='mt-1 flex text-sm'>
                                                <p className='text-muted-foreground'>Category:{" "}{label}</p>
                                                <p className='ml-2 border-l text-muted-foreground border-gray-400 pl-2'>{product.type}</p>
                                            </div>
                                            <p className='mt-1 text-sm font-medium text-green-900'>
                                                <span className='mr-1 line-through text-xs font-normal text-gray-400'>{formatPrice(product.mrp)}</span>
                                                {formatPrice(product.price)}
                                            </p>
                                        </div>
                                        <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
                                            <div className='absolute right-0 top-0'>
                                                <Button aria-label='remove product' onClick={() => removeItemCompletely(product.id)} variant='ghost'>
                                                    <X className='h-5 w-6' aria-hidden='true' />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-4 text-xs text-muted-foreground flex '>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 shrink-0 rounded-full m-2"
                                            onClick={() => removeItem(product.id)}
                                            disabled={productCount === 0}
                                        >
                                            <MinusIcon className="h-4 w-4" />
                                            <span className="sr-only">Decrease</span>
                                        </Button>
                                        <div className="text-xl font-bold tracking-tighter text-gray-900 text-center m-2">
                                            {productCount}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="m-2 h-8 w-8 shrink-0 rounded-full"
                                            onClick={() => addItem(product, productCount + 1)}
                                        // disabled={goal >= 400}
                                        >
                                            <PlusIcon className="h-4 w-4" />
                                            <span className="sr-only">Increase</span>
                                        </Button>


                                    </div>
                                    {
                                        product.stock
                                            ? <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
                                                <Check className='h-5 w-5 flex-shrink-0 text-green-500' />
                                                <span>In Stock</span>
                                            </p>
                                            : <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
                                                <X className='h-5 w-5 flex-shrink-0 text-red-500' />
                                                <span>Out of stock</span>
                                            </p>
                                    }

                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default CheckOutProductList
