"use client"
import { TQueryValidator } from '@/lib/validators/query-validator'
import { Product } from '@/payload-types'
import { trpc } from '@/trpc/client'
import React, { useState } from 'react'
import ProductListing from './ProductListing'
import PaginationComponent from './PaginationComponent'
import { FALLBACK_CURSOR, FALLBACK_LIMIT } from '@/lib/config/constants'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'

interface AllProductsPageProps {
    title: string,
    subtitle?: string
    query: TQueryValidator
    mode: "allProducts" | "purchasedProducts"
}

const AllProductsPage = (props: AllProductsPageProps) => {

    const { title, subtitle, query, mode } = props

    const [cursor, setCursor] = useState<number>(FALLBACK_CURSOR)

    let queryResults = null
    let isLoading = false
    let error = null
    let isError = false

    if (mode === "allProducts") {

        const { data: queryResult, isLoading: isLoadingState } = trpc.getInfiniteProducts.useQuery({
            limit: query.limit ?? FALLBACK_LIMIT, query, cursor: cursor ? cursor : FALLBACK_CURSOR
        }
        )
        queryResults = queryResult
        isLoading = isLoadingState
    }
    else
        if (mode === "purchasedProducts") {
            const { data: queryResult, isLoading: isLoadingState, error: errorState, isError: isErrorState } = trpc.productProcedures.getPurchasedProducts.useQuery({
                limit: query.limit ?? FALLBACK_LIMIT, query, cursor: cursor ? cursor : FALLBACK_CURSOR
            },)
            queryResults = queryResult
            isLoading = isLoadingState
            error = errorState
            isError = isErrorState
        }

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

    if (isError && error && error.message === "UNAUTHORIZED") return (
        <div className='flex-col flex mx-auto my-auto h-screen justify-center items-center w-screen'>
            <h1 className='text-4xl font-bold tracking-normal text-gray-900 sm:text-5xl' >Not Signed In</h1>
            <p className='mt-2 text-base text-muted-foreground'>
                You&apos;ve have not signed in to your Account. Please sign-in to view your Library.
            </p>
            <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/sign-in?origin=library`} className={cn(buttonVariants({ variant: "outline" }), "mt-6")} >Click here to Sign-in</Link>
        </div>
    )
    else
        return (
            <>
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
                            {mode === "allProducts" ?
                                <div>
                                    <h1 className='font-bold text-2xl' >
                                        <span className='text-orange-400 font-semibold text-sm'>Something&apos;s fishy,</span>
                                        <br></br> No Products found.<br></br>
                                    </h1>
                                    <p className='text-muted-foreground'>We guarantee you&apos;ll find something here next time you visit.</p>
                                </div>
                                : <div>
                                    <h1 className='font-bold text-2xl' >
                                        <span className='text-orange-400 font-semibold text-sm'>Whoa!</span>
                                        <br></br>You still haven&apos;t bought anything.<br></br>
                                    </h1>
                                    <p className='text-muted-foreground'>We guarantee you&apos;ll find something of liking in our store.</p>
                                    <div className='flex items-center justify-center my-2'>
                                        <Link className={cn(buttonVariants({ variant: "link" }), "text-blue-500")} href={"/books"}>Click here to go the store &rarr;</Link>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </section>
                <PaginationComponent
                    cursor={cursor}
                    hasPrevPage={hasPrevPage}
                    hasNextPage={hasNextPage}
                    setCursor={setCursor}
                    prevPage={prevPage}
                    nextPage={nextPage}
                />
            </>
        )
}

export default AllProductsPage
