"use client"
import { Product } from '@/payload-types'
import React, { useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import { PRODUCT_CATEGORIES } from '@/lib/config'
import ImageSlider from './ImageSlider'
import { isValidURL } from '@/lib/validators/urlValidator'
interface ProductListingProps {
    product: Product | null,
    index: number
}

const ProductListing = ({ product, index }: ProductListingProps) => {

    const [isVisible, setIsVisible] = useState<boolean>(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, index * 75);
        return () => clearTimeout(timer)
    }, [index])

    if (!product || !isVisible) return <ProductPlaceholder />

    const label = PRODUCT_CATEGORIES.find(
        ({ value }) => value === product.category)?.label

    const validUrl = product.images.map(
        ({ image }) => (typeof image === 'string' ? isValidURL(image) : image.url)
    ).filter(Boolean) as string[]

    if (isVisible && product) {
        return (
            <Link className={
                cn('invisible h-full w-full cursor-pointer group/main',
                    {
                        "visible animate-in fade-in-5": isVisible
                    }
                )}
                href={`/book/${product.id}`
                }
            >
                <div className='flex w-full flex-col'>
                    <ImageSlider urls={validUrl} />
                    <h3 className='mt-4 font-medium text-sm text-gray-700'>
                        {product.name}
                    </h3>
                    <p className='mt-1 text-sm text-gray-500'>{label} <span> |</span> {product.type}</p>
                    <p className='mt-1 font-medium text-sm text-gray-900'>{formatPrice(product.price)}</p>
                </div>
            </Link>
        )
    }
    // return (
    //     <div>

    //     </div>
    // )
}

export const ProductPlaceholder = () => {
    return (
        <div className='flex flex-col w-full'>
            <div className='relative aspect-square w-full overflow-hidden rounded-xl'>
                <Skeleton className='h-full w-full bg-zinc-300' />
            </div>
            <Skeleton className='mt-4 w-2/3 h-4 rounded-lg bg-zinc-300' />
            <Skeleton className='mt-2 w-16 h-4 rounded-lg bg-zinc-300' />
            <Skeleton className='mt-2 w-12 h-4 rounded-lg bg-zinc-300' />
        </div>
    )
}

export const CarouselProductPlaceholder = () => {
    return (
        <div className='flex flex-col w-full'>
            <div className='relative aspect-square w-full overflow-hidden rounded-xl'>
                <Skeleton className='h-full w-full bg-zinc-300' />
            </div>
        </div>
    )
}


export default ProductListing
