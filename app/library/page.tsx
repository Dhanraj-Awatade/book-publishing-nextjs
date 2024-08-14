"use client"
import LibraryProductReel from '@/components/LibraryProductReel'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PaginationComponent from '@/components/PaginationComponent'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
// type Param = string | string[] | undefined

// interface LibraryPageProps {
//     searchParams: { [key: string]: Param }
// }

// const parse = (param: Param) => {
//     return typeof param === "string" ? param : undefined
// }

const LibraryPage = (/*{ searchParams }: LibraryPageProps*/) => {

    // parse(searchParams.sort)
    // const category = searchParams.get('category')
    // // parse(searchParams.category)
    // const label = PRODUCT_CATEGORIES.find(({ value }) => value === category)?.label

    // const nextCookies = cookies()
    // const user = await getServerSideUser(nextCookies)

    const [cursor, setCursor] = useState<number>(1)
    const [hasNextPage, setHasNextPage] = useState(true)
    const [hasPrevPage, setHasPrevPage] = useState(true)

    return (
        <MaxWidthWrapper>

            <LibraryProductReel
                setNextPageFn={setHasNextPage}
                setPrevPageFn={setHasPrevPage}
                cursor={cursor}
                title={"Your eBook Library"}
                query={{ limit: 16, sort: "asc" }}
            />

            <PaginationComponent
                hasPrevPage={hasPrevPage}
                cursor={cursor}
                hasNextPage={hasNextPage}
                setCursor={setCursor}
            />

        </MaxWidthWrapper>
    )
}

export default LibraryPage
