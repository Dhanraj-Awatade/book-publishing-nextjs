"use client"
import { trpc } from '@/trpc/client'
import { Loader, TicketCheck, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'

interface VerifyEmailProps {
  token: string
}
const VerifyEmail = ({ token }: VerifyEmailProps) => {
  try {

    const { data, isError, isLoading } = trpc.auth.verifyEmail.useQuery({
      token
    })

    if (isError) {
      // console.log("In Error Verify Email")

      return <div className='flex flex-col items-center gap-2'>
        <XCircle className='h-8 w-8 text-red-600' />
        <h3 className='font-semibold text-xl'>There was a problem</h3>
        <p className='text-muted-foreground text-sm'>
          This token is not valid or it might&apos;ve been expired.
        </p>
        <p className='font-semibold text-muted-foreground text-sm'>
          Please try again.
        </p>
      </div>
    }

    if (data?.success) {
      // console.log("In Success Verify EMail")
      return (
        <div className='flex h-full flex-col items-center justify-center'>
          <div className='relative mb-4 h-60 w-60 text-green-700 flex items-center justify-center'>
            {/* <Image src='/Images/hippo-email-sent.png' fill alt='hippo sent email image' /> */}
            <TicketCheck className='h-full w-full' />
          </div>
          <h3 className='font-semibold text-2xl'>You&apos;re verified now!</h3>
          <p className='text-muted-foreground'>The email verification was successful.</p>
          <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/sign-in`} className={buttonVariants({ className: 'mt-4' })}>Sign in</Link>
        </div>
      )
    }

    if (isLoading) {
      return <div className='flex flex-col items-center gap-2'>
        <Loader className='animate-spin h-8 w-8 text-zinc-400' />
        <h3 className='font-semibold text-xl'>Loading....</h3>
        <p className='font-semibold text-muted-foreground text-sm'>
          This wont&apos;t take long.
        </p>
      </div>
    }


  } catch (error) {
    console.log("Verify Email Error:", error)
  }


  // const isError = false
  // const data = { success: true }


}

export default VerifyEmail
