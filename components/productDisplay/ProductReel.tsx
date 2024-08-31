"use client"
import { TQueryValidator } from '@/lib/validators/query-validator'
import { Product } from '@/payload-types'
import { trpc } from '@/trpc/client'
import Link from 'next/link'
import React from 'react'
import ProductListing from './ProductListing'

interface ProductReelProps {
    title: string,
    subtitle?: string
    Collectionhref?: string
    query: TQueryValidator
    cursor?: number
    setPrevPageFn?: React.Dispatch<React.SetStateAction<boolean>>
    setNextPageFn?: React.Dispatch<React.SetStateAction<boolean>>
}

const FALLBACK_LIMIT = 4

const ProductReel = (props: ProductReelProps) => {

    const { title, subtitle, Collectionhref, query, cursor, setNextPageFn, setPrevPageFn } = props
    const FALLBACK_CURSOR = 1

    const { data: queryResults, isLoading } = trpc.getInfiniteProducts.useQuery({
        limit: query.limit ?? FALLBACK_LIMIT, query, cursor: cursor ? cursor : FALLBACK_CURSOR
    },
        {
            //     getNextPageParam: (lastPage) => {
            //         console.log("getNextPageParam:", lastPage.nextPage);
            //         return lastPage.nextPage
            //     },
            //     refetchOnWindowFocus: false,
            //     // refetchInterval: 4000
        }
    )
    // let products: Product[] | undefined = []

    // const nextPage = queryResults?.nextPage
    const hasPrevPage = queryResults?.hasPrevPage
    const hasNextPage = queryResults?.hasNextPage
    // useEffect(() => {
    //     callbackFn ? callbackFn(nextPage, prevPage) : null
    //     console.log(nextPage,prevPage)
    // }, [nextPage, prevPage])

    const products = queryResults?.items
    // .pages.flatMap(
    //     (page) => page.items
    // )

    let map: (Product | null)[] = []

    if (products && products.length) {
        map = products
    }
    else if (isLoading) {
        map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null)
    }
    // useEffect(() => {
    if (setPrevPageFn) { hasPrevPage ? setPrevPageFn(hasPrevPage) : setPrevPageFn(false) }
    if (setNextPageFn) { hasNextPage ? setNextPageFn(hasNextPage) : setNextPageFn(false) }
    // }, [hasNextPage])

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
                {Collectionhref
                    ? <Link href={Collectionhref} className='hidden text-sm font-medium text-red-600 hover:text-red-500 md:block'>
                        Browse entire collection{' '}
                        <span aria-hidden='true'>&rarr;</span>
                    </Link>
                    : null}
            </div>
            {products?.length || isLoading ?
                <div className='relative'>
                    <div className='mt-6 flex items-center w-full'>
                        <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
                            {map.map((product, i) => (
                                <ProductListing key={`product-${i}`} product={product} index={i} />
                            ),
                            )}
                        </div>
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
