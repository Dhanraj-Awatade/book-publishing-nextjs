"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useCart } from '@/lib/hooks/use-cart'
import { Product } from '@/payload-types'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const AddToCartButton = ({ product }: { product: Product }) => {

    const { addItem, items } = useCart()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        if (isSuccess) toast.success("Added to Cart Successfully!")

        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000);
        return () => clearTimeout(timeout)

    }, [isSuccess])

    const cartProductIds = items.map((item) => item.product.id)
    const alreadyInCart = cartProductIds.includes(product.id)

    return <>
        <Button
            onClick={() => {
                addItem(product)
                setIsSuccess(true)
            }}
            size='lg'
            className='w-full mt-2'
        >
            {'Add to Cart'}
        </Button>
        {
            alreadyInCart
                ? <Button
                    onClick={() => router.push('/cart')}
                    size='lg'
                    className='w-full mt-2'
                >
                    {'Go to Cart'}
                </Button>
                : null
        }
    </>
}

export default AddToCartButton
