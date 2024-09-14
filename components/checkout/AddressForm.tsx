import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { trpc } from '@/trpc/client';
import { AddrCredentialsValidator, TAddrCredentialsValidator } from '@/lib/validators/address-creds-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface AddressFormProps {
    refetch: Function
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddressForm = ({ refetch, open, setOpen }: AddressFormProps) => {

    const { data: updatedAddresses, mutate: saveAddress, } = trpc.payment.saveAddressToUser.useMutation({
        onSuccess: () => { refetch(); toast.success("Added address successfully") },
        // onMutate: () => { toast.message("Adding address") }
    })

    const { register, handleSubmit, formState: { errors } } = useForm<TAddrCredentialsValidator>({
        resolver: zodResolver(AddrCredentialsValidator)
    })

    const onSubmit = ({ house, name, pin, state, road, nickname }: TAddrCredentialsValidator) => {
        console.log("onSubmit Clicked")
        saveAddress({ house, name, pin, road, state, nickname })
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)} >
            <DialogContent>
                <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md">

                    <DialogHeader>
                        <DialogTitle className="text-2xl text-center">Add a new Address</DialogTitle>
                        <DialogDescription className='text-center'>Please fill all the required feilds below</DialogDescription>
                    </DialogHeader>

                    <div className="p-4 pb-0">
                        {/* <div className=" bg-blue-300"> */}
                        <ScrollArea className="min-h-96 mt-2">
                            <div className='max-h-96 md:max-h-full'>
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
                                            <div className='grid gap-1 py-2'>
                                                <Label htmlFor='nickname'>Nickname</Label>
                                                <Input {...register('nickname')}
                                                    className={cn({
                                                        "focus-visible:ring-gray-500": !errors.nickname,
                                                        "focus-visible:ring-red-500": errors.nickname
                                                    })}
                                                    placeholder="Enter a nickname for your new address"
                                                // value={"User Name"}
                                                />
                                                {
                                                    errors?.nickname && (
                                                        <p className='text-sm font-semibold mt-2 text-red-500'>
                                                            {errors.nickname.message}
                                                        </p>
                                                    )
                                                }
                                            </div>
                                            <Button size={"lg"} onClick={() => { handleSubmit(onSubmit); }}>Save Details</Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                    {/* <DialogFooter>

                    </DialogFooter> */}
                </div>
            </DialogContent>
        </Dialog>


    )
}

export default AddressForm
