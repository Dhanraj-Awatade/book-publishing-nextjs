import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const page = ({ searchParams }: PageProps) => {
    const message = searchParams.message
    return (
        <div className='h-screen items-center justify-center flex-col flex gap-y-4'>
            <h1>{message}</h1>
            <Link href={"/"} className={cn("", buttonVariants({ variant: "destructive" }))}>Return to Home</Link>
        </div>
    )
}

export default page
