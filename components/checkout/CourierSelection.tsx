import { formatPrice } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

interface CourierSelectionProps {
    isMounted: boolean
}

const CourierSelection = ({ isMounted }: CourierSelectionProps) => {
    return (
        <div className='my-2'>
            <h2 className='text-lg font-medium text-gray-900 my-2'>Select Courier</h2>
            <RadioGroup defaultValue="option-one" className='justify-between flex border-b border-gray-200'>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Option One</Label>
                </div>
                <div><p className='text-sm font-medium text-gray-900'>
                    {
                        isMounted
                            ? <>
                                <span className='mr-1 line-through text-xs font-normal text-gray-400'>{formatPrice(100)}</span>
                                {formatPrice(200)}
                            </>

                            : (
                                <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                            )
                    }
                </p></div>
            </RadioGroup>
        </div>
    )
}

export default CourierSelection
