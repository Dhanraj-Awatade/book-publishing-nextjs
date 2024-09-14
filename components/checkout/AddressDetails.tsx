"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import { trpc } from '@/trpc/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import AddressView from './AddressView'
import AddressForm from './AddressForm'
import { Button } from '../ui/button'
interface AddressDetailsProps {
    selectAddress: Dispatch<SetStateAction<{ id: string; house: string; state: string; pin: string; adressName: string; updatedAt: string; createdAt: string; road?: string | null | undefined; } | null | undefined>>
    selectedAddress: { id: string; house: string; state: string; pin: string; adressName: string; updatedAt: string; createdAt: string; road?: string | null | undefined; } | null | undefined
}

const AddressDetails = ({ selectAddress, selectedAddress }: AddressDetailsProps) => {

    const [open, setOpen] = useState<boolean>(false)

    const { data: addresses, isLoading, refetch, } = trpc.payment.fetchUserAddresses.useQuery()

    // const selectedAddress = addresses?.find((addr)=>addr?.id === selectAddressId)

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
                                addr ? <SelectItem key={key} value={addr.id} >{`${addr.nickName} (${addr.adressName})`}</SelectItem>
                                    : <SelectItem key={key} value={"0"} >{"Error! Address not defined"}</SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                    <AddressView isLoading={isLoading} selectedAddress={selectedAddress} />
                    <div className='relative flex my-3 justify-center text-xs uppercase'>
                        <span className='bg-transparent px-2 text-muted-foreground'>
                            or
                        </span>
                    </div>
                    <Button
                        variant={'default'}
                        size={'lg'}
                        className='rounded-md p-2 w-full'
                        onClick={() => { setOpen(true) }}
                    >
                        Add new address
                    </Button>
                    <AddressForm refetch={refetch} open={open} setOpen={setOpen} />
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
