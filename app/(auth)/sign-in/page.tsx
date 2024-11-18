"use client"
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TAuthCredentialsValidator, AuthCredentialsValidator, TSignInAuthCredentialsValidator, SignInAuthCredentialsValidator } from '@/lib/validators/account-creds-validator'
import { trpc } from '@/trpc/client'
import { toast } from 'sonner'
import { ZodError } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle, X } from 'lucide-react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'



const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const isAuthor = searchParams.get('as') === 'author'
    const origin = searchParams.get('origin')

    const continueAsAuthor = () => {
        router.push('?as=author')
    }

    const continueAsCustomer = () => {
        router.replace('/sign-in', undefined)
    }

    const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
        onSuccess: () => {
            toast.success("Signed in successfully.")
            if (origin) {
                router.replace(`/${origin}`)
                router.refresh()
                return
            }
            if (isAuthor) {
                return
                //TO-DO: Implement Author Selling
            }
            router.replace('/')
            router.refresh()
        },
        onError: (err) => {
            if (err.data?.code === "UNAUTHORIZED") {
                toast.error("Invalid Credentials.")
            }
            else {
                toast.error(`Couldn't Sign-in, Please try again later.`)
            }
        }
    })

    const { register, handleSubmit, formState: { errors } } = useForm<TSignInAuthCredentialsValidator>({
        resolver: zodResolver(SignInAuthCredentialsValidator), mode: "all"
    })
    const onSubmit = ({ email, password }: TSignInAuthCredentialsValidator) => {
        signIn({ email, password })
    }

    return (
        <MaxWidthWrapper>
            <div className='flex items-center justify-center bg-green-300/20 relative'>
                {/* <Image aria-hidden className='object-cover border rounded-3xl z-0' src={"/Images/background.jpg"} fill alt='Background Image' /> */}
                <div className="w-full mx-auto md:w-2/3 pr-8 py-10 " >
                    <div className='max-h-screen w-full relative p-4 md:p-8 m-4 border rounded-3xl flex flex-col md:flex-row justify-between border-gray-300'>
                        <Image aria-hidden className='object-cover border rounded-3xl z-0' src={"/Images/background3.jpg"} fill alt='Background Image' />
                        <div className='w-full md:w-1/2 z-10 bg-slate-200/60 border rounded-3xl'>
                            <div className='grid gap-6 m-12'>
                                <h1 className='text-gray-900 text-4xl'>Sign-in</h1>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='grid gap-2'>
                                        <div className='grid gap-1 py-2 gap-y-2'>
                                            <Label htmlFor='name'>Name</Label>
                                            <Input {...register('email')}
                                                className={cn({
                                                    "focus-visible:ring-gray-500": !errors.email,
                                                    "focus-visible:ring-red-500": errors.email
                                                }, "mb-4")}
                                                placeholder="Enter your email"
                                            />
                                            {
                                                errors?.email && (
                                                    <p className='text-sm font-semibold mt-2 text-red-500'>
                                                        {errors.email.message}
                                                    </p>
                                                )
                                            }
                                            <Label htmlFor='password'>Password</Label>
                                            <Input {...register('password')} type='password'
                                                className={cn({
                                                    "focus-visible:ring-gray-500": !errors.password,
                                                    "focus-visible:ring-red-500": errors.password
                                                })}
                                                placeholder="Enter your password"
                                            />

                                            {errors?.password ?
                                                (
                                                    <p className='gap-x-2 flex text-sm font-semibold mt-2 items-center'>
                                                        <X className='text-red-500' />{errors.password.message}
                                                    </p>
                                                )
                                                : <p className='gap-x-2 flex text-sm font-semibold mt-2 items-center'>
                                                    <CheckCircle className='text-green-700' /> {"Password is of 8 characters"}
                                                </p>
                                            }
                                        </div>
                                        <Button disabled={isLoading}>{isLoading ? "Signing you in" : "Sign-in"}</Button>
                                    </div>
                                </form>

                            </div>
                        </div>
                        <div className='relative items-center justify-center flex'>
                            <div>
                                <div className='hidden relative md:flex justify-center text-xs uppercase'>
                                    <span className='bg-transparent px-2 text-muted-foreground'>
                                        or
                                    </span>
                                </div>
                                <div className='flex items-center justify-center'>{
                                    isAuthor
                                        ? (
                                            <Button onClick={continueAsCustomer}
                                                variant='link'
                                                className='my-2 bg-blue-300 lg:bg-transparent lg:text-red-500'
                                                disabled={isLoading}>
                                                Continue as Customer &rarr;
                                            </Button>)
                                        : (
                                            <Button onClick={continueAsAuthor}
                                                variant='link'
                                                className='my-2 lg:text-lg bg-blue-300 lg:bg-transparent lg:text-red-500'
                                                disabled={isLoading}>
                                                Continue as an author &rarr;
                                            </Button>
                                        )
                                }</div>
                            </div>
                        </div>
                        {/* <div aria-hidden className='hidden md:block'></div> */}
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default Page
