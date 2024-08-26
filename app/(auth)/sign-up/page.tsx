"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/lib/validators/account-creds-validator'
import { trpc } from '@/trpc/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ZodError } from 'zod'

const SignUp = () => {

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
        resolver: zodResolver(AuthCredentialsValidator),
        mode: "all"
    })
    const onSubmit = ({ name, email, password, confirmPass }: TAuthCredentialsValidator) => {
        mutate({ name, email, password, confirmPass })
    }


    return (
        <div className='flex items-center justify-center bg-green-300/20 relative'>
            {/* <Image aria-hidden className='object-cover border rounded-3xl z-0' src={"/Images/background.jpg"} fill alt='Background Image' /> */}
            <div className="w-full md:w-2/3 px-8 py-10 " >
                <div className='max-h-screen w-full relative p-8 m-4 border rounded-3xl flex flex-col md:flex-row justify-between bg-white border-gray-300'>
                    <Image aria-hidden className='object-cover border rounded-3xl z-0' src={"/Images/background.jpg"} fill alt='Background Image' />
                    <div className='w-full md:w-1/2 z-10 bg-slate-200/60 border rounded-3xl'>
                        <div className='grid gap-6 m-12'>
                            <h1 className='text-gray-900 text-4xl'>Sign Up</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='grid gap-2'>
                                    <div className='grid gap-1 py-2'>
                                        {/* <Label htmlFor='name'>Name</Label> */}
                                        <Input {...register('name')}
                                            className={cn({
                                                "focus-visible:ring-gray-500": !errors.name,
                                                "focus-visible:ring-red-500": errors.name
                                            })}
                                            placeholder="Name"


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
                                        {/* <Label htmlFor='email'>Email</Label> */}
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
                                        {/* <Label htmlFor='password'>Password</Label> */}
                                        <Input {...register('password')} type='password'
                                            className={cn({
                                                "focus-visible:ring-gray-500": !errors.password,
                                                "focus-visible:ring-red-500": errors.password
                                            })}
                                            placeholder="Enter a Strong Password"
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
                                    <div className='grid gap-1 py-2'>
                                        {/* <Label htmlFor='password'>Password</Label> */}
                                        <Input {...register('confirmPass')} type='password'
                                            className={cn({
                                                "focus-visible:ring-gray-500": !errors.password,
                                                "focus-visible:ring-red-500": errors.password
                                            })}
                                            placeholder="Re-enter your Password"
                                        />
                                        {
                                            errors?.confirmPass && (
                                                <p className='flex gap-x-2 text-sm font-semibold mt-2 items-center'>
                                                    <X className='text-red-500' />{errors.confirmPass.message}
                                                </p>
                                            )
                                        }
                                    </div>
                                    <Button disabled={isLoading}>{isLoading ? "Signing Up" : "Sign Up"}</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
