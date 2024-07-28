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
                router.push(`/${origin}`)
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
        resolver: zodResolver(SignInAuthCredentialsValidator)
    })
    const onSubmit = ({ email, password }: TSignInAuthCredentialsValidator) => {
        signIn({ email, password })
    }

    return (
        <>
            <div className='container relative pt-20 flex-col items-center lg:px-20'>
                <div className='flex flex-col mx-auto w-full justify-center space-y-6 sm:w-[350px]'>
                    <div className='flex flex-col items-center'>
                        <Image src={"/Images/Humaaans_SignIn.png"} alt='Human Sign-in Image' width={943.00108} height={795.62948} />
                        <h1 className='text-2xl my-4 font-semibold'>Sign in to your {isAuthor ? "author " : " "}Account</h1>
                        <div className='grid gap-6'>
                            <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                                <div className='grid gap-2'>
                                    <div className='grid gap-1 py-2'>
                                        <Label htmlFor='email'>Email</Label>
                                        <Input {...register('email')}
                                            className={cn({
                                                "focus-visible:ring-gray-500": !errors.email,
                                                "focus-visible:ring-red-500": errors.email
                                            })}
                                            placeholder="you@example.com"
                                        />
                                        {
                                            errors?.email && (
                                                <p className='text-sm font-semibold mt-2 text-red-500'>
                                                    {errors.email.message}
                                                </p>
                                            )
                                        }
                                    </div>
                                    <div className='grid gap-1 py-2'>
                                        <Label htmlFor='password'>Password</Label>
                                        <Input {...register('password')} type='password'
                                            className={cn({
                                                "focus-visible:ring-gray-500": !errors.password,
                                                "focus-visible:ring-red-500": errors.password
                                            })}
                                            placeholder="Enter your Password"
                                        />
                                        {
                                            errors?.password && (
                                                <p className='text-sm font-semibold mt-2 text-red-500'>
                                                    {errors.password.message}
                                                </p>
                                            )
                                        }
                                    </div>
                                    <Button>Login</Button>
                                </div>
                            </form>

                            <div className='relative'>
                                <div aria-hidden='true' className='absolute inset-0 flex items-center'>
                                    <span className='w-full border-t' />
                                </div>
                                <div className='relative flex justify-center text-xs uppercase'>
                                    <span className='bg-transparent px-2 text-muted-foreground'>
                                        or
                                    </span>
                                </div>
                            </div>
                            {
                                isAuthor
                                    ? (
                                        <Button onClick={continueAsCustomer}
                                            variant='secondary'
                                            disabled={isLoading}>
                                            Continue as Customer
                                        </Button>)
                                    : (
                                        <Button onClick={continueAsAuthor}
                                            variant='secondary'
                                            disabled={isLoading}>
                                            Continue as author
                                        </Button>
                                    )
                            }
                        </div>
                        <Separator className='my-4' />
                        <h4 className='text-muted-foreground'>Don&apos;t have an account?</h4>
                        <Link className={buttonVariants({ variant: 'link' })} href={"/sign-up"}>Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
