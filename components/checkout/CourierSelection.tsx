import { cn, formatPrice } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Card, CardContent, CardHeader } from '../ui/card'

interface CourierSelectionProps {
    isMounted: boolean
    availableCouriers: any
    isLoading: boolean
    setShippingCharges: React.Dispatch<React.SetStateAction<number>>
}

const CourierSelection = ({ isMounted, availableCouriers, isLoading, setShippingCharges }: CourierSelectionProps) => {
    const [prefferedCourier, setPrefferedCourier] = useState<null | number>(null)
    const [courier, selectCourier] = useState(prefferedCourier)

    useEffect(() => {
        if (availableCouriers && availableCouriers.data && availableCouriers.data.available_courier_companies) {
            // console.log("Couriers on Client Side", availableCouriers.data)
            setPrefferedCourier(availableCouriers.data.recommended_courier_company_id)
            const firstElement = availableCouriers.data.available_courier_companies.at(0)
            selectCourier(firstElement.courier_company_id)
            setShippingCharges(firstElement.cod_charges + firstElement.freight_charge)
            // console.log("preffered", availableCouriers.data.recommended_courier_company_id);
        }
    }, [availableCouriers])

    return (
        <div className='my-2'>
            <h2 className='text-lg font-medium text-gray-900 my-2'>Select Courier</h2>

            <RadioGroup
                defaultValue={`${prefferedCourier}`}
                className=' md:flex'
            >
                {availableCouriers && availableCouriers.data && availableCouriers.data.available_courier_companies
                    ? availableCouriers.data.available_courier_companies.map((data: any) =>
                        <div key={data.courier_company_id} className="flex items-center md:mx-auto my-2 space-x-2">
                            <RadioGroupItem
                                className={cn({ "bg-green-500": data.courier_company_id === courier })}
                                value={`${data.courier_company_id
                                    }`}
                                id={`${data.courier_company_id
                                    }`}
                                onClick={() => {
                                    selectCourier(data.courier_company_id);
                                    setShippingCharges(data.cod_charges + data.freight_charge)
                                }}
                            />
                            <Card>
                                <CardHeader>
                                    <Label
                                        htmlFor={`${data.courier_company_id}`}
                                    >
                                        {`${data.courier_name}`}
                                    </Label>
                                    <p hidden={data.courier_company_id !== prefferedCourier} className='text-xs text-green-500'>Preffered</p>
                                </CardHeader>
                                <CardContent>
                                    <div><p className='text-sm font-medium text-gray-900'>
                                        {
                                            isMounted || isLoading
                                                ? <>
                                                    <span className='mr-1 text-xs font-normal text-gray-400'>Charges:{' '}</span>
                                                    {formatPrice(data.cod_charges + data.freight_charge)}
                                                    <br />
                                                    <span className='mr-1 text-xs font-normal text-gray-400'>ETA:{' '}</span>
                                                    {data.etd}
                                                </>
                                                : (
                                                    <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                                                )
                                        }
                                    </p></div>
                                </CardContent>
                            </Card>
                        </div>
                    )
                    :
                    <RadioGroup defaultValue="option-one" disabled className='justify-between flex'>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-one" id="option-one" />
                            {/* <Label htmlFor="option-one">Option One</Label> */}
                            <Card>
                                <CardHeader className='bg-red-200 border rounded-lg border-red-700'>
                                    <Label htmlFor="option-one">Couldn&apos;t fetch courier options. Please try toggling payment method or select an address.</Label></CardHeader>
                            </Card>
                        </div>
                    </RadioGroup>
                }
            </RadioGroup>
        </div>
    )
}

export default CourierSelection
