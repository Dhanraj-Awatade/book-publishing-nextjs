"use client"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PaginationComponent from '@/components/PaginationComponent'
import ProductReel from '@/components/ProductReel'
import { PRODUCT_CATEGORIES } from '@/lib/config'
import React, { useState } from 'react'
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
    const [cursor, setCursor] = useState<number>(1)

    const [hasNextPage, setHasNextPage] = useState(true)
    const [hasPrevPage, setHasPrevPage] = useState(true)

    return (
        <MaxWidthWrapper>

            <ProductReel setNextPageFn={setHasNextPage} setPrevPageFn={setHasPrevPage} cursor={cursor} title={label ?? "Browse all the books here"} query={{ category, type, limit: 16, sort: sort === "desc" || sort === "asc" ? sort : undefined }} />

            <PaginationComponent cursor={cursor} hasPrevPage={hasPrevPage} hasNextPage={hasNextPage} setCursor={setCursor} />

        </MaxWidthWrapper>
    )
}

export default ProductsPage
