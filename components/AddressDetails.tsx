"use client"
import { AddrCredentialsValidator, TAddrCredentialsValidator } from '@/lib/validators/address-creds-validator'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { trpc } from '@/trpc/client'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer'
import { ScrollArea } from './ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { toast } from 'sonner'
import AddressView from './AddressView'
import PropTypes from "prop-types"
import { Address } from '@/payload-types'
interface AddressDetailsProps {
    selectAddress: Dispatch<SetStateAction<{ id: string; house: string; state: string; pin: string; adressName: string; updatedAt: string; createdAt: string; road?: string | null | undefined; } | null | undefined>>
    selectedAddress: { id: string; house: string; state: string; pin: string; adressName: string; updatedAt: string; createdAt: string; road?: string | null | undefined; } | null | undefined
}

const AddressDetails = ({ selectAddress, selectedAddress }: AddressDetailsProps) => {

    const { data: addresses, isLoading, refetch, } = trpc.payment.fetchUserAddresses.useQuery()
    const { data: updatedAddresses, mutate: saveAddress, } = trpc.payment.saveAddressToUser.useMutation({
        onSuccess: () => { refetch(); toast.success("Added address successfully") },
        // onMutate: () => { toast.message("Adding address") }
    })


    // const selectedAddress = addresses?.find((addr)=>addr?.id === selectAddressId)
    const { register, handleSubmit, formState: { errors } } = useForm<TAddrCredentialsValidator>({
        resolver: zodResolver(AddrCredentialsValidator)
    })
    const onSubmit = ({ house, name, pin, state, road }: TAddrCredentialsValidator) => {
        console.log("onSubmit Clicked")

        saveAddress({ house, name, pin, road, state })
    }
    const handleSelection = (value: string) => {
        selectAddress(addresses?.find((addr) => addr?.id === value))
    }

    return (
        <div className='container relative flex-col items-center lg:px-20'>
            <div className='flex flex-col mx-auto w-full justify-center space-y-6 sm:w-[350px]'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-2xl my-4 font-semibold'>Address Details</h1>
                    {/* <h2>Use Existing Address</h2> */}
                    <Select onValueChange={handleSelection}>
                        {isLoading
                            ? <SelectTrigger><SelectValue placeholder={"Loading Addresses"} /></SelectTrigger>
                            : <SelectTrigger><SelectValue /*defaultValue={addresses?.at(0)?.id}*/ placeholder={!addresses ? "No Address found" : /*addresses?.at(0)?.adressName*/"Click to choose from existing addresses"} /></SelectTrigger>
                        }
                        <SelectContent>
                            {addresses?.map((addr, key) =>
                                <SelectItem key={key} value={addr!.id} >{addr!.adressName}</SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                    <AddressView isLoading={isLoading} selectedAddress={selectedAddress} />
                    <div className='relative flex my-3 justify-center text-xs uppercase'>
                        <span className='bg-transparent px-2 text-muted-foreground'>
                            or
                        </span>
                    </div>
                    <Drawer> <DrawerTrigger asChild >
                        <Button
                            variant={'outline'}
                            className=' relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
                        >
                            Add new address
                        </Button>
                    </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md">

                                <DrawerHeader>
                                    <DrawerTitle className="text-2xl text-center">Add a new Address</DrawerTitle>
                                    <DrawerDescription className='text-center'>Please fill all the required feilds below</DrawerDescription>
                                </DrawerHeader>

                                <div className="p-4 pb-0">
                                    {/* <div className=" bg-blue-300"> */}
                                    <ScrollArea className="min-h-96 mt-2">
                                        <div className='max-h-96'>
                                            <div className='grid gap-6'>
                                                <form method='POST' onSubmit={handleSubmit(onSubmit)}>
                                                    <div className='grid gap-2'>
                                                        <div className='grid gap-1 py-2'>
                                                            <Label htmlFor='name'>Name</Label>
                                                            <Input {...register('name')}
                                                                className={cn({
                                                                    "focus-visible:ring-gray-500": !errors.name,
                                                                    "focus-visible:ring-red-500": errors.name
                                                                })}
                                                                placeholder="Enter name for your new address"
                                                            // value={"User Name"}
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
                                                            <Label htmlFor='house'>HOUSE/FLAT/BLOCK NO.</Label>
                                                            <Input {...register('house')} type='text'
                                                                className={cn({
                                                                    "focus-visible:ring-gray-500": !errors.house,
                                                                    "focus-visible:ring-red-500": errors.house
                                                                })}
                                                                placeholder="required field"
                                                            // value={"User Email"}
                                                            />
                                                            {
                                                                errors?.house && (
                                                                    <p className='text-sm font-semibold mt-2 text-red-500'>
                                                                        {errors.house.message}
                                                                    </p>
                                                                )
                                                            }
                                                        </div>
                                                        <div className='grid gap-1 py-2'>
                                                            <Label htmlFor='road'>APARTMENT/ROAD/AREA</Label>
                                                            <Input {...register('road')} type='text'
                                                                className={cn({
                                                                    "focus-visible:ring-gray-500": !errors.road,
                                                                    "focus-visible:ring-red-500": errors.road
                                                                })}
                                                            // placeholder="required field"
                                                            // value={"User Email"}
                                                            />
                                                            {
                                                                errors?.road && (
                                                                    <p className='text-sm font-semibold mt-2 text-red-500'>
                                                                        {errors.road.message}
                                                                    </p>
                                                                )
                                                            }
                                                        </div>
                                                        <div className='grid gap-1 py-2'>
                                                            <Label htmlFor='pin'>Pin Code</Label>
                                                            <Input {...register('pin')} type='number'
                                                                className={cn({
                                                                    "focus-visible:ring-gray-500": !errors.pin,
                                                                    "focus-visible:ring-red-500": errors.pin
                                                                })}
                                                                placeholder="Enter your Pincode (Required)"
                                                            // value={"User pin"}
                                                            />
                                                            {
                                                                errors?.pin && (
                                                                    <p className='text-sm font-semibold mt-2 text-red-500'>
                                                                        {errors.pin.message}
                                                                    </p>
                                                                )
                                                            }
                                                        </div>
                                                        <div className='grid gap-1 py-2'>
                                                            <Label htmlFor='state'>State</Label>
                                                            <Input {...register('state')} type='text'
                                                                className={cn({
                                                                    "focus-visible:ring-gray-500": !errors.state,
                                                                    "focus-visible:ring-red-500": errors.state
                                                                })}
                                                                placeholder="required field"
                                                            // value={"User state"}
                                                            />
                                                            {
                                                                errors?.state && (
                                                                    <p className='text-sm font-semibold mt-2 text-red-500'>
                                                                        {errors.state.message}
                                                                    </p>
                                                                )
                                                            }
                                                        </div>
                                                        {/*  */}<DrawerClose >
                                                            <Button size={"lg"} onClick={() => { handleSubmit(onSubmit) }}>Save Details</Button>
                                                        </DrawerClose>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </ScrollArea>
                                </div>
                                <DrawerFooter>

                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>


                </div>
            </div>
        </div>

        //------------------------------------------------------------------------------------------------------------------//
        // <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
        //     <h2 className='text-lg font-medium text-gray-900'>Address Details</h2>
        //     <div className='mt-6 space-y-4'>
        //         <div className='flex items-center justify-between'>
        //             <p className='text-sm text-gray-600'>Name</p>
        //             <p className='text-sm text-gray-900 font-medium'>
        //                 {/* {
        //                                 isMounted
        //                                     ? formatPrice(cartTotal)
        //                                     : (
        //                                         <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
        //                                     )
        //                             } */}
        //             </p>
        //         </div>
        //         <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
        //             <div className='flex items-center text-sm text-muted-foreground'>
        //                 <span>Flat transaction fee</span>
        //             </div>
        //             <div className='text-sm font-medium text-gray-900'>
        //                 {/* {isMounted
        //                                 ? formatPrice(fee)
        //                                 : (
        //                                     <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
        //                                 )} */}
        //             </div>
        //         </div>
        //         <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
        //             <div className='text-base font-medium text-gray-900'>Order Total</div>
        //             <div className='text-base font-medium text-gray-900'>
        //                 {/* {
        //                                 isMounted
        //                                     ? formatPrice(cartTotal + fee)
        //                                     : (
        //                                         <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
        //                                     )
        //                             } */}
        //             </div>
        //         </div>
        //     </div>
        // </section>

    )
}

export default AddressDetails
