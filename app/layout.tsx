import type { Metadata } from 'next'
import { Inter, /*Varela, Varela_Round */ Fira_Sans } from 'next/font/google'
import './globals.css'
import Header from '../components/header_footer/Header'
import Footer from '../components/header_footer/Footer'
import { cn } from '@/lib/utils'
import Providers from '@/components/Providers'
import { Toaster } from 'sonner'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })
const fira = Fira_Sans({ subsets: ['latin'], weight: "500" })

/*const varela = Varela({ weight: '400', subsets: ['latin'] })
const varela_round = Varela_Round({ weight: '400', subsets: ['latin'] })*/

export const metadata: Metadata = {
  title: 'Saptarshee Publishers',
  description: 'Discover a world of books and ebooks at Saptarshee Publications. Our online bookstore offers a vast collection of titles for readers in India (e-Books available internationally). Enjoy seamless reading experiences with our integrated ebook reader. Shop now to find your next favorite read.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html className='h-full'>
        <body className={cn("relative h-full font-sans antialiased", fira.className)}>
          <main className='h-full relative flex flex-col min-h-screen'>
            <Providers>
              <Header />
              <div className='flex-grow flex-1'>{children}</div>
              <Footer />
            </Providers>
          </main>
          <Toaster position='top-center' richColors />
        </body>
      </html>
      {/* <Script src="https://checkout.razorpay.com/v1/checkout.js" /> */}
    </>
  )
}
