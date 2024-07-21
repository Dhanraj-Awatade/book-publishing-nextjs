'use client'

import { Button } from "./ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"

import { PRODUCT_CATEGORIES, PRODUCT_TYPES } from '@/lib/config'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { useEffect, useState } from 'react'
import { ScrollArea } from "./ui/scroll-area"
import { useRouter } from "next/navigation"

// // import {} from ''

interface MobileNavProps {
    isSignedIn: boolean
}

const MobileNav = ({ isSignedIn }: MobileNavProps) => {
    //     const [isOpen, setIsOpen] = useState<boolean>(false)

    //     const pathname = usePathname()

    //     // whenever we click an item in the menu and navigate away, we want to close the menu
    //     useEffect(() => {
    //         setIsOpen(false)
    //     }, [pathname])

    //     // when we click the path we are currently on, we still want the mobile menu to close,
    //     // however we cant rely on the pathname for it because that won't change (we're already there)
    //     const closeOnCurrent = (href: string) => {
    //         if (pathname === href) {
    //             setIsOpen(false)
    //         }
    //     }

    //     // remove second scrollbar when mobile menu is open
    //     useEffect(() => {
    //         if (isOpen)
    //             document.body.classList.add('overflow-hidden')
    //         else document.body.classList.remove('overflow-hidden')
    //     }, [isOpen])

    //     if (!isOpen)
    //         return (
    //             <button
    //                 type='button'
    //                 onClick={() => setIsOpen(true)}
    //                 className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
    //                 <Menu className='h-6 w-6' aria-hidden='true' />
    //             </button>
    //         )

    const router = useRouter()

    return (

        <Drawer>
            <DrawerTrigger asChild >
                <Button
                    variant={'outline'}
                    className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
                >
                    <Menu className='h-6 w-6' aria-hidden='true' />
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md">

                    <DrawerHeader>
                        <DrawerTitle className="text-2xl">Explore the Store</DrawerTitle>
                        <DrawerDescription>Choose what you want to explore</DrawerDescription>
                    </DrawerHeader>

                    <div className="p-4 pb-0">
                        <div className="min-h-64 mt-2">
                            <ScrollArea>
                                <div className='max-h-60'>
                                    <ul>
                                        {PRODUCT_TYPES.map((type) => (
                                            <li
                                                key={type.label}
                                                className='space-y-10 px-4 pb-8 pt-0'>
                                                <div className='border rounded-lg border-gray-400'>
                                                    <div className='-mb-px flex'>
                                                        <p className='border-transparent rounded-lg text-center text-gray-900 bg-secondary flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium'>
                                                            {type.label}s
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className='grid grid-cols-3 gap-y-10 gap-x-4'>
                                                    {PRODUCT_CATEGORIES.map((category) => (
                                                        <div
                                                            key={category.label}
                                                            className='group relative text-sm min-w-fit'>
                                                            <div className='relative aspect-square  overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                                                                <DrawerClose>
                                                                    <Image
                                                                        fill
                                                                        src={category.imgSrc}
                                                                        alt='product category image'
                                                                        className='object-cover object-center'
                                                                        onClick={() => router.push(category.href)}
                                                                    />
                                                                </DrawerClose>
                                                            </div>
                                                            <div className="flex flex-1 justify-center items-center">
                                                                <DrawerClose>
                                                                    <Button
                                                                        onClick={() => router.push(category.href)}
                                                                        variant={'outline'}
                                                                        // href={category.href}
                                                                        className='mt-4 font-medium text-gray-900'>
                                                                        {category.label}
                                                                    </Button>
                                                                </DrawerClose>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollArea>
                        </div>
                    </div>

                    <DrawerFooter>
                        {isSignedIn
                            ? <Button onClick={() => router.push('/cart')} variant={'default'}>Go to Cart</Button>
                            : <div className="w-full flex flex-1 max-w-sm justify-evenly">
                                <Button className="mx-3 w-1/2" variant={'default'}>Sign-in</Button>
                                <Button className="mx-3 w-1/2" variant={'outline'}>Sign-up</Button>
                            </div>
                        }
                        <DrawerClose asChild>
                            <Button variant={'destructive'}>Close Drawer</Button>
                        </DrawerClose>

                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>

        //         <div>
        //             <div className='relative  lg:hidden'>
        //                 <div className='fixed inset-0 bg-black bg-opacity-25' />
        //             </div>

        //             <div className='fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex'>
        //                 <div className='w-4/5'>
        //                     <div className='relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
        //                         <div className='flex px-4 pb-2 pt-5'>
        //                             <button
        //                                 type='button'
        //                                 onClick={() => setIsOpen(false)}
        //                                 className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
        //                                 <X className='h-6 w-6' aria-hidden='true' />
        //                             </button>
        //                         </div>

        //                         <div className='mt-2'>
        //                             <ul>
        //                                 {PRODUCT_TYPES.map((type) => (
        //                                     <li
        //                                         key={type.label}
        //                                         className='space-y-10 px-4 pb-8 pt-10'>
        //                                         <div className='border-b border-gray-200'>
        //                                             <div className='-mb-px flex'>
        //                                                 <p className='border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium'>
        //                                                     {type.label}
        //                                                 </p>
        //                                             </div>
        //                                         </div>

        //                                         <div className='grid grid-cols-2 gap-y-10 gap-x-4'>
        //                                             {PRODUCT_CATEGORIES.map((category) => (
        //                                                 <div
        //                                                     key={category.label}
        //                                                     className='group relative text-sm'>
        //                                                     <div className='relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
        //                                                         <Image
        //                                                             fill
        //                                                             src={category.imgSrc}
        //                                                             alt='product category image'
        //                                                             className='object-cover object-center'
        //                                                         />
        //                                                     </div>
        //                                                     <Link
        //                                                         href={category.href}
        //                                                         className='mt-6 block font-medium text-gray-900'>
        //                                                         {category.label}
        //                                                     </Link>
        //                                                 </div>
        //                                             ))}
        //                                         </div>
        //                                     </li>
        //                                 ))}
        //                             </ul>
        //                         </div>

        //                         <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
        //                             <div className='flow-root'>
        //                                 <Link
        //                                     onClick={() => closeOnCurrent('/sign-in')}
        //                                     href='/sign-in'
        //                                     className='-m-2 block p-2 font-medium text-gray-900'>
        //                                     Sign in
        //                                 </Link>
        //                             </div>
        //                             <div className='flow-root'>
        //                                 <Link
        //                                     onClick={() => closeOnCurrent('/sign-up')}
        //                                     href='/sign-up'
        //                                     className='-m-2 block p-2 font-medium text-gray-900'>
        //                                     Sign up
        //                                 </Link>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
    )
}

export default MobileNav