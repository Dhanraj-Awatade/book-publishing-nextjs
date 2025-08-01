import ImageSlider from '@/components/productDisplay/ImageSlider'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/productDisplay/ProductReel'
import { Separator } from '@/components/ui/separator'
import { PRODUCT_CATEGORIES } from '@/lib/config'
import { getPayloadClient } from '@/lib/get-payload'
import { getServerSideUser } from '@/lib/payload-utils'
import { formatPrice } from '@/lib/utils'
import { isValidURL } from '@/lib/validators/urlValidator'
import { Check, Shield, X } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import ReadButton from './ReadButton'

interface PageProps {
    params: {
        // type: "ebook" | "paperback",
        productId: string
    }
}

const BREADCRUMBS = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Books', href: '/books' },
]

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const { productId } = params
    const payload = await getPayloadClient()

    // const product = await fetch(`https://.../${id}`).then((res) => res.json())

    const { docs: products } = await payload.find({
        collection: "products",
        limit: 1,
        where: {
            id: {
                equals: productId
            },
            approvedForSale: {
                equals: "approved"
            }
        }
    })

    const [product] = products

    const validUrl = product.images.map(
        ({ image }) => (typeof image === 'string' ? isValidURL(image) : image.url)
    ).filter(Boolean) as string[]

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: product.name,
        openGraph: {
            images: [validUrl.at(0) as string, ...previousImages],
        },
    }
}

const Page = async ({ params }: PageProps) => {

    const { productId } = params
    const payload = await getPayloadClient()
    const nextCookies = cookies()
    const signedUser = await getServerSideUser(nextCookies)


    const { docs: products } = await payload.find({
        collection: "products",
        limit: 1,
        where: {
            id: {
                equals: productId
            },
            approvedForSale: {
                equals: "approved"
            }
        }
    })

    const [product] = products

    if (!product) return notFound()

    const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label

    const validUrl = product.images.map(
        ({ image }) => (typeof image === 'string' ? isValidURL(image) : image.url)
    ).filter(Boolean) as string[]

    return (
        <MaxWidthWrapper>
            <div className='bg-white'>
                <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
                    {/* Product Details */}
                    <div className='lg:max-w-lg lg:self-end'>
                        <ol className='flex items-center space-x-2'>
                            {BREADCRUMBS.map((breadcrumb, i) => (
                                <li key={breadcrumb.href}>
                                    <div className='items-center flex text-sm'>
                                        <Link href={breadcrumb.href} className='font-medium text-sm text-muted-foreground hover:text-gray-900'>
                                            {breadcrumb.name}
                                        </Link>
                                        {i !== BREADCRUMBS.length - 1
                                            ? (
                                                <svg
                                                    viewBox='0 0 20 20'
                                                    fill='currentColor'
                                                    aria-hidden='true'
                                                    className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                                                    <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                                                </svg>
                                            )
                                            : null
                                        }
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <div className='mt-4'>
                            <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>{product.name}</h1>
                        </div>

                        <section className='mt-4'>
                            <div className='flex items-center'>
                                <p className='font-normal mr-2 line-through text-sm text-gray-400'>
                                    {formatPrice(product.mrp)}
                                </p>
                                <p className='font-medium text-xl text-green-900'>
                                    {formatPrice(product.price)}
                                </p>
                                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                                    {label}
                                </div>
                                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                                    {product.type}
                                </div>
                            </div>
                            {/* Product Images */}

                            <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-4 lg:self-center' >
                                <div className='aspect-square rounded-lg'>
                                    <ImageSlider urls={validUrl} />
                                </div>
                            </div >
                        </section>
                    </div>
                    <div>
                        <section>
                            <p className='font-semibold mt-6'>Description</p>
                            <Separator className='my-2' />
                            <div className='mx-4 space-y-6'>
                                <p className='text-base text-muted-foreground'>
                                    {product.description}
                                </p>
                            </div>
                            <Separator className='my-2' />
                            <div className='mt-4 flex flex-col gap-y-2 items-start'>
                                {product.attributes?.author
                                    ? <p className='ml-2 text-sm text-muted-foreground'>
                                        Author:{" "}
                                        <span className='text-sm text-muted-foreground font-semibold text-rose-400'>
                                            {product.attributes?.author}
                                        </span>
                                    </p>
                                    : null
                                }
                                {product.attributes?.isbn
                                    ? <p className='ml-2 text-sm text-muted-foreground'>
                                        ISBN Number:{" "}
                                        <span className='text-sm text-muted-foreground font-semibold text-blue-400'>
                                            {product.attributes?.isbn}
                                        </span>
                                    </p>
                                    : null
                                }
                                {product.attributes?.language
                                    ? <p className='ml-2 text-sm text-muted-foreground'>
                                        Language:{" "}
                                        <span className='text-sm text-muted-foreground font-semibold text-blue-400'>
                                            {product.attributes?.language}
                                        </span>
                                    </p>
                                    : null
                                }
                                {product.attributes?.pages
                                    ? <p className='ml-2 text-sm text-muted-foreground'>
                                        Number of pages:{" "}
                                        <span className='text-sm text-muted-foreground font-semibold text-blue-400'>
                                            {product.attributes?.pages}
                                        </span>
                                    </p>
                                    : null
                                }
                                {product.attributes?.publication
                                    ? <p className='ml-2 text-sm text-muted-foreground'>
                                        Publication:{" "}
                                        <span className='text-sm text-muted-foreground font-semibold text-blue-400'>
                                            {product.attributes?.publication}
                                        </span>
                                    </p>
                                    : null
                                }</div>

                            {product.stock
                                ? <div className='mt-4 flex items-center'>

                                    <Check aria-hidden='true' className='h-5 w-5 flex-shrink-0 text-green-500' />
                                    <p className='ml-2 text-sm text-muted-foreground'>In Stock</p>
                                </div>
                                : <div className='mt-4 flex items-center'>

                                    <X aria-hidden='true' className='h-5 w-5 flex-shrink-0 text-red-500' />
                                    <p className='ml-2 text-sm text-muted-foreground'>Out of Stock</p>
                                </div>
                            }


                            {/* Add to cart Part */}
                            <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start' >
                                <div>

                                    <ReadButton userId={signedUser?.id} product={product} isSignedUser={signedUser ? true : false} />

                                    <div className='mt-6 text-center'>
                                        <div className='group inline-flex text-sm text-medium'>
                                            <Shield aria-hidden='true' className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400' />
                                            <span className='text-muted-foreground hover:text-gray-700'>Verified by our Authors</span>
                                        </div>
                                    </div>
                                </div>
                            </div >

                        </section>
                    </div >
                </div >
            </div >

            <ProductReel
                title={`Similar ${label}`}
                subtitle={`Browse Similar High Quality ${label} just like ${product.name}`}
                collectionHref='/products'
                query={{ category: product.category, limit: 4 }}
            />

        </MaxWidthWrapper >
    )
}

export default Page
