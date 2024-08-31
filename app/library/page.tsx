
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import AllProductsPage from '@/components/productDisplay/AllProductsPage'

const LibraryPage = () => {
    return (
        <MaxWidthWrapper>

            <AllProductsPage
                mode='purchasedProducts'
                title={"Your eBook Library"}
                query={{ limit: 16, sort: "asc" }}

            />
        </MaxWidthWrapper>
    )
}

export default LibraryPage
