import React from 'react'
import { Separator } from './ui/separator'
import { Loader2 } from 'lucide-react'

interface AddressViewProps {
    isLoading: boolean
    selectedAddress: {
        id: string;
        house: string;
        state: string;
        pin: string;
        createdAt: string;
        updatedAt: string;
        adressName: string;
        road?: string | null | undefined;
    } | null | undefined
}
const AddressView = ({ isLoading, selectedAddress }: AddressViewProps) => {

    return (
        <section className='mt-2 rounded-lg border-gray-400 border bg-gray-50 p-0 sm:p-6 items-center flex-col w-full'>
            {selectedAddress === null
                ? <h3 className='text-lg font-medium text-gray-900 text-center'>No Address Selected</h3>
                : <>
                    <h3 className='text-lg font-medium text-gray-900 text-center'>Selected Address</h3>
                    <div className='mt-6 space-y-4 w-full'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center text-sm text-muted-foreground'>
                                <span>Address Name</span>
                            </div>
                            <div className='text-sm font-medium text-gray-900 whitespace-normal'>
                                {isLoading
                                    ? (<Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />)
                                    : selectedAddress?.adressName
                                }
                            </div>
                        </div>
                        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                            <div className='flex items-center text-sm text-muted-foreground'>
                                <span>HOUSE/FLAT/BLOCK NO.</span>
                            </div>
                            <div className='text-sm font-medium text-gray-900 whitespace-normal'>
                                {isLoading
                                    ? (<Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />)
                                    : selectedAddress?.house
                                }
                            </div>
                        </div>
                        {selectedAddress?.road
                            ? <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                                <div className='flex items-center text-sm text-muted-foreground'>
                                    <span>APARTMENT/ROAD/AREA</span>
                                </div>
                                <div className='text-sm font-medium text-gray-900 whitespace-normal'>
                                    {isLoading
                                        ? (<Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />)
                                        : selectedAddress?.road
                                    }
                                </div>
                            </div>
                            : null
                        }
                        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                            <div className='flex items-center text-sm text-muted-foreground'>
                                <span>Pin Code</span>
                            </div>
                            <div className='text-sm font-medium text-gray-900 whitespace-normal'>
                                {isLoading
                                    ? (<Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />)
                                    : selectedAddress?.pin
                                }
                            </div>
                        </div>
                        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                            <div className='flex items-center text-sm text-muted-foreground'>
                                <span>State</span>
                            </div>
                            <div className='text-sm font-medium text-gray-900 whitespace-normal'>
                                {isLoading
                                    ? (<Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />)
                                    : selectedAddress?.state
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </section>
    )
}

export default AddressView
