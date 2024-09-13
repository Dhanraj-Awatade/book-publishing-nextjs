"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/lib/validators/account-creds-validator'
import { trpc } from '@/trpc/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ZodError } from 'zod'

const SignUp = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const isAuthor = searchParams.get('as') === 'author'
    const origin = searchParams.get('origin')

    const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
        onError: (err) => {
            if (err.data?.code === "CONFLICT") {
                toast.error("Email Already Exists. Sign-in?")
                router.push("/sign-in")
                return
            }
            if (err instanceof ZodError) {
                toast.error(err.issues[0].message)
                return
            }
            toast.error("Cannot sign-in automatically. Please sign-in manually.")
            router.push("/sign-in")
        },
        onSuccess: ({ name }) => {
            toast.success(`User ${name} signed up successfully.`)
            // toast.success(`Verification mail sent to ${sentToEmail}.`)
            // router.push('/verify-email?to=' + sentToEmail)
            if (origin) {
                router.replace(`/${origin}`)
                router.refresh()
            }
            if (isAuthor) { return }
            router.replace("/")
            router.refresh()
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
            <div className="w-full mx-auto md:w-2/3 pr-8 py-10 " >
                <div className='max-h-screen w-full relative p-4 md:p-8 m-4 border rounded-3xl flex flex-col md:flex-row justify-between border-gray-300'>
                    <Image aria-hidden className='object-cover border rounded-3xl z-0' src={"/Images/background3.jpg"} fill alt='Background Image' />
                    <div className='w-full md:w-1/2 z-10 bg-slate-200/70 border rounded-3xl'>
                        <div className='grid gap-6 m-12'>
                            <h1 className='text-gray-900 text-4xl'>Sign-up</h1>
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
                                        {errors?.name ?
                                            (
                                                <p className='gap-x-2 flex text-xs lg:text-sm font-semibold mt-2 items-center'>
                                                    <X className='text-red-500' />{errors.name.message}
                                                </p>
                                            )
                                            : <p className='gap-x-2 flex text-xs lg:text-sm font-semibold mt-2 items-center'>
                                                <CheckCircle className='text-green-700 w-4 lg:w-max' /> {"Valid name"}
                                            </p>
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
                                        {errors?.email ?
                                            (
                                                <p className='gap-x-2 flex text-xs lg:text-sm font-semibold mt-2 items-center'>
                                                    <X className='text-red-500' />{errors.email.message}
                                                </p>
                                            )
                                            : <p className='gap-x-2 flex text-xs lg:text-sm font-semibold mt-2 items-center'>
                                                <CheckCircle className='text-green-700 w-4 lg:w-max' /> {"Valid email"}
                                            </p>
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
                                                <p className='gap-x-2 flex text-xs lg:text-sm font-semibold mt-2 items-center'>
                                                    <X className='text-red-500' />{errors.password.message}
                                                </p>
                                            )
                                            : <p className='gap-x-2 flex text-xs lg:text-sm font-semibold mt-2 items-center'>
                                                <CheckCircle className='text-green-700 w-4 lg:w-max' /> {"Password is of 8 characters"}
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
                                            errors?.confirmPass
                                                ? <p className='gap-x-2 flex text-xs lg:text-sm font-semibold mt-2 items-center'>
                                                    <X className='text-red-500' />{errors.confirmPass.message}
                                                </p>

                                                : <p className='gap-x-2 flex text-xs lg:text-sm font-semibold mt-2 items-center'>
                                                    <CheckCircle className='text-green-500 w-4 lg:w-max' />{"Passwords matched"}
                                                </p>

                                        }
                                    </div>
                                    <Button disabled={isLoading}>{isLoading ? "Signing Up" : "Sign Up"}</Button>
                                </div>
                            </form>
                            {/* <div className='my-2 gap-y-2'>
                                <Separator className='bg-slate-500' />
                                <p className='text-center text-sm my-2'>Already a customer?</p>
                                <Button variant={"destructive"} onClick={() => router.push("/sign-in")} className='w-full'>Sign in</Button>
                            </div> */}
                        </div>
                    </div>
                    <div className='relative items-center justify-center flex'>
                        <div>
                            <div className='relative md:flex mt-2 justify-center text-sm'>
                                <span className='bg-transparent px-2 text-muted-foreground'>
                                    Already a customer?
                                </span>
                            </div>
                            <div className='flex items-center justify-center'>{
                                <Button
                                    variant='link'
                                    className='my-2 lg:text-lg bg-blue-300 lg:bg-transparent lg:text-red-500'
                                    disabled={isLoading}
                                    onClick={() => router.push("/sign-in")}
                                >
                                    Sign in here &rarr;
                                </Button>

                            }</div>
                        </div>
                    </div>
                    {/* <div className='flex relative items-center justify-center'>
                        <div aria-hidden='true' className='absolute inset-0 flex items-center'>
                            <span className='h-full border border-gray-500' />
                        </div>
                        <div className='relative flex justify-center items-center text-xs uppercase'>
                            <span className='bg-transparent py-2 text-muted-foreground'>
                                or
                            </span>
                        </div>
                    </div> */}
                    {/* <div className='relative mx-auto text-center'>
                        <span className='uppercase text-muted-foreground border-b'>or continue with</span>
                        <Button variant={"destructive"} onClick={() => router.push("/sign-in")} className='w-full my-4'>Sign in</Button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default SignUp
