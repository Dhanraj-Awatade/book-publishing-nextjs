import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CarouselItem } from '../../ui/carousel'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/payload-types'
import { CarouselProductPlaceholder } from '../ProductListing'
import { isValidURL } from '@/lib/validators/urlValidator'

interface CarouselImageProps {
    product: Product | null
    index: number
}
const CarouselImage = ({ product, index }: CarouselImageProps) => {

    const [isVisible, setIsVisible] = useState<boolean>(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, index * 75);
        return () => clearTimeout(timer)
    }, [index])

    if (!product || !isVisible) return <CarouselProductPlaceholder />

    const validUrl = product.images.map(
        ({ image }) => (typeof image === 'string' ? isValidURL(image) : image.url)
    ).filter(Boolean) as string[]

    return (
        <CarouselItem key={`product-${index}`}>
            <Link href={`/book/${product?.id}`}>
                <Image
                    src={validUrl.at(0) as string}
                    alt='Product Image'
                    width={480}
                    height={480}
                />
            </Link>
        </CarouselItem>
    )
}

export default CarouselImage
