// "use client"
// import { TPurchasedProductsQueryValidator } from '@/lib/validators/query-validator'
// import { Product } from '@/payload-types'
// import { trpc } from '@/trpc/client'
// import Link from 'next/link'
// import React from 'react'
// import ProductListing from './ProductListing'
// import { cn } from '@/lib/utils'
// import { buttonVariants } from '../ui/button'
// import { FALLBACK_CURSOR, FALLBACK_LIMIT } from '@/lib/config/constants'

// // TO-Do: Fix Error => Cannot update a component (`LibraryPage`) while rendering a different component (`LibraryProductReel`). 
// // To locate the bad setState() call inside `LibraryProductReel`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
// interface LibraryProductReelProps {
//     title: string,
//     subtitle?: string
//     href?: string
//     query: TPurchasedProductsQueryValidator
//     cursor?: number
//     setPrevPageFn?: React.Dispatch<React.SetStateAction<boolean>>
//     setNextPageFn?: React.Dispatch<React.SetStateAction<boolean>>
// }


// const LibraryProductReel = (props: LibraryProductReelProps) => {

//     const { title, subtitle, href, query, setPrevPageFn, cursor, setNextPageFn } = props

//     const { data: queryResults, isLoading, error, isError } = trpc.productProcedures.getPurchasedProducts.useQuery({
//         limit: query.limit ?? FALLBACK_LIMIT, query, cursor: cursor ? cursor : FALLBACK_CURSOR
//     },
//         {
//             getNextPageParam: (lastPage) => lastPage.nextPage,
//         })

//     const products = queryResults?.items
//     // pages.flatMap((page) => page.purchasedProducts as (Product | null)[])

//     const hasNextPage = queryResults?.hasNextPage
//     const hasPrevPage = queryResults?.hasPrevPage

//     let map: (Product | null)[] | undefined = []
//     !isLoading
//     if (products && products.length) {
//         map = products.map((prod) => prod.type === "ebook" ? prod : null)
//             .filter((prod): prod is Product => prod !== null)
//     }
//     else if (isLoading) { map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null) }

//     if (setPrevPageFn) { hasPrevPage ? setPrevPageFn(hasPrevPage) : setPrevPageFn(false) }
//     if (setNextPageFn) { hasNextPage ? setNextPageFn(hasNextPage) : setNextPageFn(false) }


//     if (isError && error.message === "UNAUTHORIZED") return (
//         <div className='flex-col flex mx-auto my-auto h-screen justify-center items-center w-screen'>
//             <h1 className='text-4xl font-bold tracking-normal text-gray-900 sm:text-5xl' >Not Signed In</h1>
//             <p className='mt-2 text-base text-muted-foreground'>
//                 You&apos;ve have not signed in to your Account. Please sign-in to view your Library.
//             </p>
//             <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/sign-in?origin=library`} className={cn(buttonVariants({ variant: "outline" }), "mt-6")} >Click here to Sign-in</Link>
//         </div>
//     )
//     else
//         return (
//             <section className='py-12'>
//                 <div className='md:flex md:items-center md:justify-between mb-4'>
//                     <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
//                         {title
//                             ? <h1 className='sm:text-3xl text-gray-900 text-2xl font-bold'>{title}</h1>
//                             : null}
//                         {subtitle
//                             ? <p className='mt-2 text-sm text-muted-foreground'>{subtitle}</p>
//                             : null}
//                     </div>
//                     {href
//                         ? <Link href={href} className='hidden text-sm font-medium text-red-600 hover:text-red-500 md:block'>
//                             Browse entire collection{' '}
//                             <span aria-hidden='true'>&rarr;</span>
//                         </Link>
//                         : null}
//                 </div>
//                 {map.length || isLoading ?
//                     <div className='relative'>
//                         <div className='mt-6 flex items-center w-full'>
//                             <div className='w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8'>
//                                 {map.map((product, i) => (
//                                     <ProductListing key={`product-${i}`} product={product} index={i} />
//                                 ),
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                     : <div className='flex items-center justify-center mt-12 mx-auto'>
//                         <div aria-hidden>
//                             <h1 className='font-bold text-2xl' >
//                                 <span className='text-orange-400 font-semibold text-sm'>Something&apos;s fishy,</span>
//                                 <br></br> No Products found.<br></br>
//                             </h1>
//                             <p>We guarantee you&apos;ll find something here next time you visit.</p>
//                         </div>
//                     </div>
//                 }
//             </section>
//         )
// }

// export default LibraryProductReel
