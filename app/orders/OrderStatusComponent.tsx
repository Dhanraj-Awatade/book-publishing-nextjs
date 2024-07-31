"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'

const OrderStatusComponent = ({ id }: { id: string }, orderStatus: {}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button disabled>Shipment Status</Button>
            </DropdownMenuTrigger>
        </DropdownMenu>
    )
}

export default OrderStatusComponent
