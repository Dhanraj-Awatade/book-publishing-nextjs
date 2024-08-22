import localFont from 'next/font/local'
import Link from 'next/link'
import React, { use } from 'react'
import styles from './header.module.css'
import { cn } from '@/lib/utils';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import NavItems from '@/components/header_footer/NavItems';
import { buttonVariants } from '@/components/ui/button';
// import { Ghost } from 'lucide-react';
// import { spawn } from 'child_process';
// import { Span } from 'next/dist/trace';
import Cart from '../cart/Cart';
import { getServerSideUser } from '@/lib/payload-utils';
import { cookies } from 'next/headers';
import UserAccountNav from './UserAccountNav';
import MobileNav from './MobileNav';
import Image from 'next/image';
import UserAccountNavMobile from './UserAccountNavMobile';
// import { LINKS } from '@/lib';

// const migo = localFont({ src: [{ path: './fonts/Migo Black.ttf' }, { path: './fonts/Migo Bold.ttf', weight: 'bold' }] })
const mogena = localFont({ src: '../../public/fonts/TestDomaineDisplay-Medium.otf' })


const Header = async () => {

  const nextCookies = cookies()
  const user = await getServerSideUser(nextCookies)
  const isSignedIn = user !== null

  return (
    <div className={cn(/*styles.container,*/ "z-[50] top-0 h-18 inset-x-0 sticky  w-full bg-white/70 border-b border-gray-200 backdrop-blur-lg")}>
      <header className='relative'>
        <MaxWidthWrapper>
          <div className='flex h-16 items-center mx-4'>
            {/* Done (Completed): Mobile Nav */}
            <MobileNav isSignedIn={isSignedIn} />
            <Image className='hidden md:block' src={'/Images/logo.png'} alt='Saptarshee Logo' height={64} width={96} />
            <div className='ml-6 flex lg:ml-0 lg:text-4xl text-2xl'>
              <Link className={cn(mogena.className, styles.logo)} href={"/"}> <span className='text-rose-600 '>Saptarshee {' '}</span>Publications</Link>
            </div>
            <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
              <NavItems />
            </div>
            <div className='ml-auto flex items-center'>
              <div className='hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6'>

                <Link href='/library' className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), "font-semibold border ")}>
                  Library
                </Link>

                {isSignedIn
                  ? null
                  : <Link href='/sign-in' className={buttonVariants({ variant: 'default' })}>
                    Sign in
                  </Link>
                }

                {isSignedIn
                  ? null
                  : <span className='h-6 w-px bg-gray-200' aria-hidden="true" />
                }
                {isSignedIn
                  ? (<UserAccountNav user={user} />)
                  : (<Link href='/sign-up' className={buttonVariants({ variant: 'ghost' })}>
                    Sign up
                  </Link>
                  )
                }
                {isSignedIn ? null
                  : (<div className='lg:ml-6 flex'>
                    <span className='h-6 w-px bg-gray-200' aria-hidden="true" />
                  </div>)
                }
              </div>
              <div className='mx-4 flow-root lg:ml-6'>
                <Cart />
              </div>

              <div className='md:hidden '><UserAccountNavMobile user={user} /></div>

            </div>
          </div>
          {/* 
            <div className={styles.headerLinks}>
              {LINKS.map(link => (<Link key={link.id} className={cn(styles.link, migo.className)} href={link.link}>{link.title}</Link>))}
  </div>*/}
        </MaxWidthWrapper>
      </header>
    </div >
  )
}

export default Header
