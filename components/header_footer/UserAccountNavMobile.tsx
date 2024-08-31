"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { User } from '../../payload-types'
import Link from 'next/link'
import { useAuth } from '../../lib/hooks/use-auth'
import { InfoIcon, LibraryBigIcon, ListChecksIcon, LogInIcon, LogOutIcon, PlusCircleIcon, UserCircleIcon } from 'lucide-react'

const UserAccountNavMobile = ({ user }: { user: User | null }) => {
    const { signOut } = useAuth()
    return <DropdownMenu>
        <DropdownMenuTrigger asChild className='overflow-visible'>
            <Button variant='ghost' size='sm' className='relative'><UserCircleIcon /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white w-60' align='end'>
            <div className='flex items-center justify-start gap-2 p-2'>
                <div className='flex flex-col space-y-0.5 leading-none'>
                    {user
                        ? <p className='font-medium text-sm text-black'>{user.name}</p>
                        : <p className='font-medium text-sm text-black'>Not Signed in</p>
                    }
                </div>
            </div>

            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                {user
                    ? <Link href='/library'><LibraryBigIcon className='mx-2' />Your Library</Link>
                    : null
                }
            </DropdownMenuItem>
            {user /*&& user.role === "admin" || "editor"*/
                ? <DropdownMenuItem asChild>
                    <Link href='/orders'><ListChecksIcon className='mx-2' />Orders</Link>
                </DropdownMenuItem>
                : null
            }
            {/* To-Do: Add Account Page */}
            <DropdownMenuItem asChild>
                {user
                    ? <Link href='/account'><InfoIcon className='mx-2' />Account Details</Link>
                    : <Link href='/sign-in'><LogInIcon className='mx-2' />Sign in</Link>
                }
            </DropdownMenuItem>
            {user
                ? <DropdownMenuItem onClick={signOut} className='cursor-pointer'><LogOutIcon className='mx-2' />Log Out</DropdownMenuItem>
                : <DropdownMenuItem asChild><Link href='/sign-up'><PlusCircleIcon className='mx-2' />Sign up</Link></DropdownMenuItem>
            }
        </DropdownMenuContent>
    </DropdownMenu>
}

export default UserAccountNavMobile
