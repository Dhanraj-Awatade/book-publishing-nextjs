import React, { useEffect } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import { trpc } from '@/trpc/client'
import { TSelectedAddress } from './AddressDetails'
import { PICKUP_POSTCODE } from '@/lib/config/constants'

interface PaymentMethodSelectionProps {
    setPaymentMethod: React.Dispatch<React.SetStateAction<"razorpay" | "cod">>
    paymentMethod: "razorpay" | "cod"
    isAnyPaperback: boolean
    selectedAddress: TSelectedAddress
}

const PaymentMethodSelection = ({ paymentMethod, setPaymentMethod, isAnyPaperback, selectedAddress }: PaymentMethodSelectionProps) => {
    useEffect(() => { refetchCouriers() }, [paymentMethod])
    const checkCourierObject = {
        delivery_postcode: selectedAddress ? parseInt(selectedAddress.pin) : null,
        paymentMethod,
        pickup_postcode: PICKUP_POSTCODE,
        weight: 1
    }

    const { data: availableCouriers, refetch: refetchCouriers } = trpc.shipmentProcedures.getAvailableCouriers.useQuery(checkCourierObject, { enabled: isAnyPaperback && selectedAddress !== (undefined || null) })
    console.log("Couriers on Client Side", availableCouriers)
    return (
        <>
            <h2 className='text-lg font-medium text-gray-900 my-2'>Select Payment Method</h2>
            <RadioGroup defaultValue="razorpay" >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        className={cn({ 'bg-green-500': paymentMethod === "razorpay" })}
                        value="razorpay"
                        onClick={() => setPaymentMethod("razorpay")} id="razorpay"
                    />
                    <Label htmlFor="razorpay">Razorpay</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                        className={cn({ 'bg-green-500': paymentMethod === "cod" })}
                        value="cod"
                        disabled={!isAnyPaperback}
                        onClick={() => setPaymentMethod("cod")}
                        id="cod"
                    />
                    <Label htmlFor="cod" className={cn({ "text-muted-foreground": !isAnyPaperback })}>Cash on delivery</Label>
                </div>
            </RadioGroup>
        </>
    )
}

export default PaymentMethodSelection
