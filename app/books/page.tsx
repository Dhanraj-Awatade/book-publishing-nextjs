"use client"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationPrevious } from '@/components/ui/pagination'
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

    return (
        <MaxWidthWrapper>

            <ProductReel callbackFn={setHasNextPage} cursor={cursor} title={label ?? "Browse all the books here"} query={{ category, type, limit: 16, sort: sort === "desc" || sort === "asc" ? sort : undefined }} />

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        {/* <PaginationPrevious onClick={() => setCursor(cursor === 1 ? 1 : cursor - 1)} href={""} /> */}
                        <Button disabled={cursor === 1} onClick={() => setCursor(cursor === 1 ? 1 : cursor - 1)} variant={"outline"}>Previous</Button>
                    </PaginationItem>

                    <PaginationItem>
                        <Button onClick={() => setCursor(1)} variant={"outline"}>1</Button>
                    </PaginationItem>

                    <PaginationItem>
                        {cursor > 2
                            ? <PaginationEllipsis />
                            : <Button onClick={() => setCursor(cursor + 1)} variant={"outline"}>{cursor + 1}</Button>
                        }
                    </PaginationItem>

                    <PaginationItem>
                        <Button onClick={() => setCursor(cursor + 2)} variant={"outline"}>{cursor + 2}</Button>
                    </PaginationItem>

                    <PaginationItem>
                        <Button onClick={() => setCursor(cursor + 3)} variant={"outline"}>{cursor + 3}</Button>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>

                    <PaginationItem>
                        {/* <PaginationPrevious onClick={() => setCursor(cursor === 1 ? 1 : cursor - 1)} href={""} /> */}
                        <Button disabled={hasNextPage === false} onClick={() => setCursor(cursor + 1)} variant={"outline"}>Next</Button>
                    </PaginationItem>

                </PaginationContent>
            </Pagination>

        </MaxWidthWrapper>
    )
}

export default ProductsPage
