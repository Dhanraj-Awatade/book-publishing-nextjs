'use client'
import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import styles from './header.module.css'
import Image from 'next/image'
// import localFont from 'next/dist/compiled/@next/font/dist/local'

// const mogena = localFont({ src: './fonts/Mogena.ttf' })

//To-do (Completed): Customise Footer

const Footer = () => {
    const pathname = usePathname()
    const pathToMinimize = ["/verify-email", "/sign-up", "/sign-in"]

    return (
        <footer className='bg-gray-900 flex-grow-0'>
            <MaxWidthWrapper >
                <div className='border-t border-gray-200'>
                    <div className='flex justify-between'>
                        {pathToMinimize.includes(pathname) ? null : (
                            <div className='pb-8 pt-16'>
                                <div className='flex justify-start' >
                                    {/* <Icons.logo className='h-12 w-auto' /> */}
                                    <Image src="/Images/logo.png" alt='logo' width={180} height={120} />
                                    <div className='ml-4 mt-4 flex lg:ml-0 '>
                                        <Link className={cn(styles.footerLogo, "hidden lg:flex", "mogena")} href={"/"} >Saptarshee Publications</Link>
                                    </div>
                                </div>

                            </div>
                        )
                        }
                        <div className='gap-y-6  md:flex items-center justify-center md:gap-x-5'>
                            <div className='h-8 w-8 lg:h-12 lg:w-12 relative my-6' ><Link href={"https://www.facebook.com/saptarshee.prakashan/"}><Image src={"/Images/social_media_icons/facebook.png"} alt='facebook logo' fill /></Link></div>
                            <div className='h-8 w-8 lg:h-12 lg:w-12 relative my-6' ><Link href={"https://www.instagram.com/saptarsheeprakashan/"}><Image src={"/Images/social_media_icons/instagram.png"} alt='instagram logo' fill /></Link></div>
                            <div className='h-8 w-8 lg:h-12 lg:w-12 relative my-6' ><Link href={"https://wa.me/+919804047077"}><Image src={"/Images/social_media_icons/whatsapp.png"} alt='whatsapp logo' fill /></Link></div>
                        </div>
                        {/* <div className='border-t border-white w-2 z-[15] h-full'></div> */}
                        {
                            pathToMinimize.includes(pathname) ? null : (
                                <div className='mt-10 mx-4 border border-slate-900 rounded-lg p-3 my-auto'>
                                    <div className='relative flex items-center sm:py-8 lg:mt-0'>
                                        <div className='text-center relative mx-auto max-w-sm'>
                                            <p className=' text-sm text-muted-foreground text-yellow-100'>Want to publish your own books?{' '}</p>
                                            <Link href="/sign-in?as=author" className='font-semibold text-cyan-300 whitespace-nowrap hover:text-amber-500'><h3 className=''>Sign in az Author &rarr;</h3></Link>
                                            {/* <Link href="/sign-in?as=author" className='whitespace-nowrap font-medium text-rose-600 hover:text-amber-500>Publish Here </Link> */}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className='hidden md:flex'>
                            <div className='relative flex items-center px-6 py-6 sm:py-8 lg:mt-0'>
                                <div className='absolute inset-0 overflow-hidden rounded-lg'>
                                    <div aria-hidden="true" className='absolute inset-0 bg-gradient-to-br bg-opacity-90' />
                                </div>
                                <div aria-hidden="true" className='text-center relative mx-auto max-w-sm'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='py-10 md:flex md:items-center md:justify-around'>
                    <div className='text-center md:text-left'>
                        <p className='text-sm text-muted-foreground' >&copy;{new Date().getFullYear()} All Rights Reserved</p>
                    </div>
                    <div className='mt-4 flex items-center justify-center md:mt-0'>
                        <div className='flex space-x-8'>
                            <Link href='#' className='text-sm text-muted-foreground hover:text-gray-600' >Terms & Conditions</Link>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    )
}

export default Footer
