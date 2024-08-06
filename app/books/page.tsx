import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { PRODUCT_CATEGORIES } from '@/lib/config'
import React from 'react'
type Param = string | string[] | undefined

interface ProductPageProps {
    searchParams: { [key: string]: Param }
}

const parse = (param: Param) => {
    return typeof param === "string" ? param : undefined
}

const ProductsPage = ({ searchParams }: ProductPageProps) => {
    const sort = parse(searchParams.sort)
    const category = parse(searchParams.category)
    const type = parse(searchParams.type)
    const label = PRODUCT_CATEGORIES.find(({ value }) => value === category)?.label
    return (
        <MaxWidthWrapper>
            <ProductReel title={label ?? "Browse all the books here"} query={{ category, type, limit: 40, sort: sort === "desc" || sort === "asc" ? sort : undefined }} />
        </MaxWidthWrapper>
    )
}

export default ProductsPage
