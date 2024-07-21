import VerifyEmail from '@/components/VerifyEmail'
import Image from 'next/image'
import React from 'react'


interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const verifyEmailPage = ({ searchParams }: PageProps) => {
    const token = searchParams.token
    const email = searchParams.to
    return (
        <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                {
                    token && typeof token === 'string' ? (
                        <div className='grid gap-6'>
                            <VerifyEmail token={token} />
                        </div>
                    ) : (
                        <div className='flex h-full flex-col items-center justify-center space-y-1'>
                            <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
                                <Image src={'/Images/hippo-email-sent.png'} alt='Mail-Sent-Image' fill />
                            </div>
                            <h3 className='font-semibold text-2xl'>Please Check Your Inbox</h3>
                            {email
                                ? <p className='text-muted-foreground text-center'>
                                    We&apos;ve sent an email to <span className='font-semibold'>{email}</span>.
                                </p>
                                : <p className='text-muted-foreground text-center'>
                                    We&apos;ve sent an email to you.
                                </p>
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default verifyEmailPage