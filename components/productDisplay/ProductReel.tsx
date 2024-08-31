"use client"
import { TQueryValidator } from '@/lib/validators/query-validator'
import { Product } from '@/payload-types'
import { trpc } from '@/trpc/client'
import Link from 'next/link'
import React, { useState } from 'react'
import ProductListing from './ProductListing'
import { FALLBACK_CURSOR, FALLBACK_LIMIT } from '@/lib/config/constants'
import { Button } from '../ui/button'
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react'

interface ProductReelProps {
    title: string,
    subtitle?: string
    collectionHref?: string
    collectionTitle?: string
    query: TQueryValidator
}

const ProductReel = (props: ProductReelProps) => {

    const { title, subtitle, collectionHref, collectionTitle, query } = props
    const [cursor, setCursor] = useState<number>(FALLBACK_CURSOR)

    const { data: queryResults, isLoading } = trpc.getInfiniteProducts.useQuery({
        limit: query.limit ?? FALLBACK_LIMIT, query, cursor: cursor
    },
    )

    const nextPage = queryResults?.nextPage
    const prevPage = queryResults?.prevPage
    const hasPrevPage = queryResults?.hasPrevPage
    const hasNextPage = queryResults?.hasNextPage

    const products = queryResults?.items

    let map: (Product | null)[] = []

    if (products && products.length) {
        map = products
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
                {collectionHref
                    ? <Link href={collectionHref} className='hidden text-sm font-medium text-red-600 hover:text-red-500 md:block'>
                        Browse entire{collectionTitle ? ` ${collectionTitle}` : null} collection{' '}
                        <span aria-hidden='true'>&rarr;</span>
                    </Link>
                    : null}
            </div>

            {products?.length || isLoading ?
                <div className='relative'>
                    <div className='mt-6 flex items-center w-full'>
                        <Button disabled={!hasPrevPage} onClick={() => setCursor(prevPage ? prevPage : FALLBACK_CURSOR)} variant={"ghost"}>
                            <ChevronLeftCircle />
                        </Button>

                        <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
                            {map.map((product, i) => (
                                <ProductListing key={`product-${i}`} product={product} index={i} />
                            ),
                            )}
                        </div>

                        <Button disabled={!hasNextPage} onClick={() => setCursor(nextPage ? nextPage : FALLBACK_CURSOR)} variant={"ghost"}>
                            <ChevronRightCircle />
                        </Button>

                    </div>
                </div>
                : <div className='flex items-center justify-center mt-12 mx-auto'>
                    <div aria-hidden>
                        <h1 className='font-bold text-2xl' >
                            <span className='text-orange-400 font-semibold text-sm'>Something&apos;s fishy,</span>
                            <br></br> No Products found.<br></br>
                        </h1>
                        <p>We guarantee you&apos;ll find something here next time you visit.</p>
                    </div>
                </div>
            }
        </section>
    )
}

export default ProductReel
