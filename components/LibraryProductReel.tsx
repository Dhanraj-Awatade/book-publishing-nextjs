"use client"
import { TPurchasedProductsQueryValidator } from '@/lib/validators/query-validator'
import { Product } from '@/payload-types'
import { trpc } from '@/trpc/client'
import Link from 'next/link'
import React, { use } from 'react'
import ProductListing from './ProductListing'

interface LibraryProductReelProps {
    title: string,
    subtitle?: string
    href?: string
    query: TPurchasedProductsQueryValidator
}

const FALLBACK_LIMIT = 4

const LibraryProductReel = (props: LibraryProductReelProps) => {

    const { title, subtitle, href, query, } = props

    const { data: queryResults, isLoading } = trpc.getPurchasedProducts.useInfiniteQuery({
        limit: query.limit ?? FALLBACK_LIMIT, query
    },
        {
            getNextPageParam: (lastPage) => lastPage.nextPage,
        })

    const products = queryResults?.pages.flatMap((page) => page.purchasedProducts as (Product | null)[])

    let map: (Product | null)[] | undefined = products

    if (products && products.length) {
        map = products.filter((prod) => prod !== null)
    }
    else if (isLoading) {
        map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null)
    }

    return (
        <section className='py-12'>
            <div className='md:flex md:items-center md:justify-between mb-4'>
                <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
                    {title
                        ? <h1 className='sm:text-3xl text-gray-900 text-2xl font-bold'>{title}</h1>
                        : null}
                    {subtitle
                        ? <p className='mt-2 text-sm text-muted-foreground'>{subtitle}</p>
                        : null}
                </div>
                {href
                    ? <Link href={href} className='hidden text-sm font-medium text-red-600 hover:text-red-500 md:block'>
                        Browse entire collection{' '}
                        <span aria-hidden='true'>&rarr;</span>
                    </Link>
                    : null}
            </div>
            <div className='relative'>
                <div className='mt-6 flex items-center w-full'>
                    <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
                        {
                            map?.map((product, i) => (
                                <ProductListing key={`product-${i}`} product={product} index={i} />
                            ),
                            )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LibraryProductReel
