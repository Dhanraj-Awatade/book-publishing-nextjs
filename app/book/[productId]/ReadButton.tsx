"use client"
import AddToCartButton from '@/components/cart/AddToCartButton'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Product } from '@/payload-types'
import { trpc } from '@/trpc/client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface ReadButtonProps {
    product: Product
    isSignedUser: boolean
    userId?: string
}

const ReadButton = ({ product, isSignedUser, userId }: ReadButtonProps) => {

    const { data: isPurchased, isLoading } = trpc.productProcedures.isPurchasedProduct.useQuery({ productId: product.id, userId },)

    return (
        <div className='mt-10'>
            {
                isLoading && isSignedUser ? <Button
                    size='lg'
                    className='w-full mt-2'
                    disabled
                >
                    {"Loading purchase status"}
                    <Loader2 className='h-4 w-4 animate-spin ml-4' />
                </Button>
                    : isPurchased && product.type === "ebook"
                        ? <Link
                            href={`/reader/${product.id}`}
                            className={cn(buttonVariants({ size: 'lg' }), "w-full")}
                        >
                            Read
                        </Link>
                        : <>{product.stock
                            ? <AddToCartButton product={product} />
                            : <Button size='lg'
                                className='w-full mt-2' disabled>Add to Cart</Button>
                        }

                        </>
            }

        </div>
    )
}

export default ReadButton
