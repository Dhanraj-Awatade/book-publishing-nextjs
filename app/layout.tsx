import type { Metadata } from 'next'
import { Inter, /*Varela, Varela_Round */ } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '../components/Footer'
import { cn } from '@/lib/utils'
import Providers from '@/components/Providers'
import { Toaster } from 'sonner'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })
/*const varela = Varela({ weight: '400', subsets: ['latin'] })
const varela_round = Varela_Round({ weight: '400', subsets: ['latin'] })*/

export const metadata: Metadata = {
  title: 'Saptarshee Publishers',
  description: 'Saptarshee Books & eBooks Publishers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html className='h-full'>
        <body className={cn("relative h-full font-sans antialiased", inter.className)}>
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
