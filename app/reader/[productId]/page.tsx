import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PdfReader from '@/components/PdfReader'
import { getPayloadClient } from '@/lib/get-payload'
import React from 'react'


interface ReaderPageProps {
    params: {
        productId: string
    }
}

const ReaderPage = async ({ params }: ReaderPageProps) => {
    const { productId } = params
    const payload = await getPayloadClient()

    const { docs: products } = await payload.find({
        collection: "products",
        depth: 1,
        where: {
            id: {
                equals: productId
            }
        }
    })
    const [product] = products
    if (!product.product_files) throw new Error("Product file not found")
    const productPath = typeof product.product_files === "string" ? product.product_files : product.product_files.url!
    // const file = 
    return (
        <MaxWidthWrapper>

            <PdfReader productPath={productPath} />
        </MaxWidthWrapper>
    )
}

export default ReaderPage