'use client'
import React from 'react'
import { Button } from './ui/button'

import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from '@/lib/config'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
type Type = typeof PRODUCT_TYPES[number]

// const categories = PRODUCT_CATEGORIES.map()
interface navProps {
    type: Type,
    handleOpen: () => void
    isOpen: boolean,
    isAnyOpen: boolean,
}

function NavItem({ type, handleOpen, isAnyOpen, isOpen }: navProps) {
    const router = useRouter()
    return (
        <div className='flex'>
            <div className='relative flex items-center'>
                <Button className='gap-1.5' onClick={handleOpen} variant={isOpen ? "secondary" : "ghost"}>
                    {type.label}
                    <ChevronDown className={
                        cn("h-4 w-4 transition-all text-muted-foreground",
                            { '-rotate-180': isOpen })} />
                </Button>
            </div>
            {isOpen ? (<div className={
                cn('absolute inset-x-0 top-full text-sm text-muted-foreground',
                    {
                        "animate-in fade-in-10 slide-in-from-top-10": !isAnyOpen
                    }
                )}>
                <div className='absolute inset-0 top-1/2 bg-white shadow' aria-hidden='true' />
                <div className='relative bg-gray-100'>
                    <div className='mx-auto max-w-7xl px-8 border rounded-lg'>
                        <div className='grid grid-rows-4 gap-x-8 gap-y-10 py-16'>
                            <div className='col-span-1 row-span-4 col-start-1 grid grid-cols-6 gap-x-8 '>
                                {
                                    PRODUCT_CATEGORIES.map((category) => (
                                        <div key={category.label} className='group my-4 mx-auto aspect-square relative text-base sm:text-sm'>
                                            {/* Done (Completed): Whether to include Images => Yes*/}
                                            <div className='relative rounded-lg aspect-video overflow-hidden group-hover:opacity-75'>
                                                <Link href={category.href} ><Image fill onClick={handleOpen} src={category.imgSrc} alt='Category Image' /></Link>
                                            </div>
                                            <Link href={category.href} className='mt-6 block mx-auto text-center whitespace-normal font-semibold text-gray-900'>
                                                {category.label}
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>) : null}
        </div>
    )
}

export default NavItem
