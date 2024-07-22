import LibraryProductReel from '@/components/LibraryProductReel'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import { PRODUCT_CATEGORIES } from '@/lib/config'
import { getServerSideUser } from '@/lib/payload-utils'
import { cn } from '@/lib/utils'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'
type Param = string | string[] | undefined

interface LibraryPageProps {
    searchParams: { [key: string]: Param }
}

const parse = (param: Param) => {
    return typeof param === "string" ? param : undefined
}

const LibraryPage = async ({ searchParams }: LibraryPageProps) => {
    const sort = parse(searchParams.sort)
    const category = parse(searchParams.category)
    const label = PRODUCT_CATEGORIES.find(({ value }) => value === category)?.label
    const nextCookies = cookies()

    const { user } = await getServerSideUser(nextCookies)

    if (!user) return (
        <div className='flex-col flex mx-auto my-auto h-screen justify-center items-center w-screen'>
            <h1 className='text-4xl font-bold tracking-normal text-gray-900 sm:text-5xl' >Not Signed In</h1>
            <p className='mt-2 text-base text-muted-foreground'>
                You&apos;ve have not signed in to your Account. Please sign-in to view your Library.
            </p>
            <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/sign-in?origin=library`} className={cn(buttonVariants({ variant: "outline" }), "mt-6")} >Click here to Sign-in</Link>
        </div>
    )
    else return (
        <MaxWidthWrapper>
            {/* To-DO: Try Getting Products from User Collection instead of Product Collection */}
            <LibraryProductReel title={label ?? "Your Library"} query={{ userId: user.id, limit: 40, sort: sort === "desc" || sort === "asc" ? sort : undefined }} />
        </MaxWidthWrapper>
    )
}

export default LibraryPage
