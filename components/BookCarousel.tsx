"use client"
// import React, { useEffect } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { trpc } from '@/trpc/client'
import { Product } from '@/payload-types'
import CarouselImage from './CarouselImage'
import { Loader2 } from 'lucide-react'

const BookCarousel = () => {

    // useEffect(() => {
    //     const timeout = setTimeout(() => {

    //     }, 2000);
    //     return () => clearTimeout(timeout)

    // }, [])
    const query = { limit: 4 }
    const { data: queryResults, isLoading } = trpc.getInfiniteProducts.useInfiniteQuery({
        limit: 4, query
    },
        {
            getNextPageParam: (lastPage) => lastPage.nextPage,
        })

    const products = queryResults?.pages.flatMap(
        (page) => page.items
    )

    let map: (Product | null)[] = []

    if (products && products.length) {
        map = products
    }
    else if (isLoading) {
        map = new Array<null>(4).fill(null)
    }

    return (
        <div className='w-full max-w-xs relative justify-center mx-auto md:mr-20 flex'>
            {isLoading
                ? (
                    <Loader2 className='h-4 w-4 animate-spin text-muted-foreground items-center sm:mx-auto sm:pt-6' />
                )
                : (
                    <Carousel className="w-full max-w-xs">
                        <CarouselContent className='items-center'>
                            {
                                map.flatMap((product, i) =>
                                    <CarouselImage key={i} product={product} index={i} />
                                )
                            }
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                )
            }
        </div>
    )
}

export default BookCarousel
