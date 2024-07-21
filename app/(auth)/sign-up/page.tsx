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
import { TAuthCredentialsValidator, AuthCredentialsValidator } from '@/lib/validators/account-creds-validator'
import { trpc } from '@/trpc/client'
import { toast } from 'sonner'
import { ZodError, z } from 'zod'
import { useRouter } from 'next/navigation'



const Page = () => {
    const router = useRouter()

    const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
        onError: (err) => {
            if (err.data?.code === "CONFLICT") {
                toast.error("Email Already Exists. Sign-in?")
                return
            }
            if (err instanceof ZodError) {
                toast.error(err.issues[0].message)
                return
            }
            toast.error("Something went wrong. Please try again later.")
        },
        onSuccess: ({ sentToEmail }) => {
            toast.success(`Verification mail sent to ${sentToEmail}.`)
            router.push('/verify-email?to=' + sentToEmail)
        }
    })

    const { register, handleSubmit, formState: { errors } } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator)
    })
    const onSubmit = ({ name, email, password }: TAuthCredentialsValidator) => {
        mutate({ name, email, password })
    }


    return (
        <>
            <div className='container relative pt-20 flex-col items-center lg:px-20'>
                <div className='flex flex-col mx-auto w-full justify-center space-y-6 sm:w-[350px]'>
                    <div className='flex flex-col items-center'>
                        <Image src={"/Images/human_welcome.svg"} alt='Human Sign-up Image' width={943.00108} height={795.62948} />
                        <h1 className='text-2xl my-4'>Create an Account</h1>
                        <div className='grid gap-6'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='grid gap-2'>
                                    <div className='grid gap-1 py-2'>
                                        <Label htmlFor='name'>Name</Label>
                                        <Input {...register('name')}
                                            className={cn({
                                                "focus-visible:ring-gray-500": !errors.name,
                                                "focus-visible:ring-red-500": errors.name
                                            })}
                                            placeholder="Enter your Name here"

                                        />
                                        {
                                            errors?.name && (
                                                <p className='text-sm font-semibold mt-2 text-red-500'>
                                                    {errors.name.message}
                                                </p>
                                            )
                                        }
                                    </div>

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
                                            placeholder="Enter a Strong Password"
                                        />
                                        {
                                            errors?.password && (
                                                <p className='text-sm font-semibold mt-2 text-red-500'>
                                                    {errors.password.message}
                                                </p>
                                            )
                                        }
                                    </div>
                                    <Button>Sign Up</Button>
                                </div>
                            </form>
                        </div>
                        <Separator className='my-4' />
                        <h4 className='text-muted-foreground'>Already have an account?</h4>
                        <Link className={buttonVariants({ variant: 'link' })} href={"/sign-in"}>Sign in</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
