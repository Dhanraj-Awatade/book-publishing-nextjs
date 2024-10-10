import BookCarousel from '@/components/productDisplay/Carousel/BookCarousel'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/productDisplay/ProductReel'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Check, Star } from 'lucide-react'
import Link from 'next/link'
import HomepageBanner from '@/components/HomepageBanner'


export default function Home() {
  return (
    <>
      <HomepageBanner />
      <MaxWidthWrapper>

        <div className='mt-20 mb-10 mx-12 gap-y-6 pr-0 flex-col sm:flex-row flex md:gap-x-20 justify-between max-w-full lg:px-28'>
          <div className='text-center leading-relaxed md:ml-10 md:mr-20 lg:my-auto'>
            <h1 className='text-4xl font-bold tracking-normal text-gray-900 sm:text-4xl max-w-4xl flex flex-col items-center '>{/* lg:ml-auto lg:mr-8 */}
              Welcome to your marketplace of high-quality{' '}
              <span className=' text-rose-600'>
                Books & eBooks.
              </span>
            </h1>
          </div>

          <BookCarousel />
        </div>

        <div className='mx-auto text-center flex flex-1 flex-col items-center max-w-2xl'>

          <div className='mt-0 '>
            <Link className={buttonVariants(/*{ variant: 'destructive' }*/)} href={'/books?sort=asc'}>Browse Our Bestsellers</Link>
            <Link className={cn(buttonVariants({ variant: 'ghost' }), 'm-3')} href={'/books?sort=desc'}>See What&apos;s Trending &rarr;</Link>
          </div>

          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>Welcome to{' '}<span className='font-bold'> Saptarshee Publications.{' '}</span>Every book on our platform
            is verified by our team to ensure the highest quality standards.</p>

          <ul className='mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start'>
            <div className='space-y-2'>
              <li className='flex gap-1.5 items-center text-left'>
                <Check className='h-5 w-5 shrink-0 text-green-600' />
                High Quality Paperback Books
              </li>
              <li className='flex gap-1.5 items-center text-left'>
                <Check className='h-5 w-5 shrink-0 text-green-600' />
                Huge Library of Bestselling eBooks
              </li>
              <li className='flex gap-1.5 items-center text-left'>
                <Check className='h-5 w-5 shrink-0 text-green-600' />
                Content verified by trusted Authors
              </li>
            </div>
          </ul>

          <div className='mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5'>
            <div className='flex -space-x-4'>
              <img className='inline-block rounded-full ring-2 ring-slate-100 h-12 w-12 object-cover'
                src='/Images/Users/user1.jpg'
                alt='Customer Image'
              />
              <img className='inline-block rounded-full ring-2 ring-slate-100 h-12 w-12 object-cover'
                src='/Images/Users/user2.jpg'
                alt='Customer Image'
              />
              <img className='inline-block rounded-full ring-2 ring-slate-100 h-12 w-12 object-cover'
                src='/Images/Users/user3.jpg'
                alt='Customer Image'
              />
              <img className='inline-block rounded-full ring-2 ring-slate-100 h-12 w-12 object-cover'
                src='/Images/Users/user4.jpg'
                alt='Customer Image'
              />
              <img className='inline-block rounded-full ring-2 ring-slate-100 h-12 w-12 object-cover'
                src='/Images/Users/user5.jpg'
                alt='Customer Image'
              />
              <img className='inline-block rounded-full ring-2 ring-slate-100 h-12 w-12 object-cover'
                src='/Images/Users/user6.jpg'
                alt='Customer Image'
              />
              <img className='inline-block rounded-full ring-2 ring-slate-100 h-12 w-12 object-cover'
                src='/Images/Users/user7.jpg'
                alt='Customer Image'
              />
              <img className='inline-block rounded-full ring-2 ring-slate-100 h-12 w-12 object-cover'
                src='/Images/Users/user8.jpg'
                alt='Customer Image'
              />
              <img className='inline-block rounded-full ring-2 ring-slate-100 h-12 w-12 object-cover'
                src='/Images/Users/user9.jpg'
                alt='Customer Image'
              />
            </div>
          </div>
          <div className='flex flex-col justify-between items-center sm:items-start mt-4'>
            <div className='flex gap-1.5'>
              <Star className='h-4 w-4 text-green-600 fill-green-600' />
              <Star className='h-4 w-4 text-green-600 fill-green-600' />
              <Star className='h-4 w-4 text-green-600 fill-green-600' />
              <Star className='h-4 w-4 text-green-600 fill-green-600' />
              <Star className='h-4 w-4 text-green-600 fill-green-600' />
            </div>
          </div>
          <p className='mt-4' ><span className='font-semibold'>2000+</span> Happy Customers & counting...</p>

        </div>

        <ProductReel query={{ limit: 4 }}
          title='Latest Trending'
          collectionHref='/books'
        />
        <ProductReel query={{ sort: 'desc', limit: 4 }}
          title='Newest Releases'
          collectionHref='/books'
        />
        <ProductReel query={{ limit: 4, type: "ebook" }}
          title='Latest Trending in eBooks'
          collectionHref='/books?type=ebook'
          collectionTitle='ebook'
        />
        <ProductReel query={{ limit: 4, type: "paperback" }}
          title='Latest Trending in Paperbacks'
          collectionHref='/books?type=paperback'
          collectionTitle='paperback'
        />

      </MaxWidthWrapper >
    </>
  )
}
