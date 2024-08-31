"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { User } from '@/payload-types'
import Link from 'next/link'
import { useAuth } from '@/lib/hooks/use-auth'
import { InfoIcon, ListChecksIcon, LogOutIcon } from 'lucide-react'

const UserAccountNav = ({ user }: { user: User }) => {
    const { signOut } = useAuth()
    return <DropdownMenu>
        <DropdownMenuTrigger asChild className='overflow-visible'>
            <Button variant='destructive' size='sm' className='relative'>My Account</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white w-60' align='end'>
            <div className='flex items-center justify-start gap-2 p-2'>
                <div className='flex flex-col space-y-0.5 leading-none'>
                    <p className='font-medium text-sm text-black'>{user.name}</p>
                </div>
            </div>

            <DropdownMenuSeparator />

            {/*user.role === "admin" || "editor"*/ user
                ? <DropdownMenuItem asChild>
                    <Link href='/orders'><ListChecksIcon className='mx-2' />Orders</Link>
                </DropdownMenuItem>
                : null
            }

            {/* To-Do: Add Account Page */}
            <DropdownMenuItem asChild>
                <Link href='/account'><InfoIcon className='mx-2' />Account Details</Link>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={signOut} className='cursor-pointer'><LogOutIcon className='mx-2' />Log Out</DropdownMenuItem>

        </DropdownMenuContent>
    </DropdownMenu>
}

export default UserAccountNav
