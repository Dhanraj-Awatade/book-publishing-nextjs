"use client"
import { PRODUCT_TYPES } from '@/lib/config'
import React, { useEffect, useRef, useState } from 'react'
import NavItem from './NavItem'
import { useOnClickOutside } from '@/lib/hooks/use-on-click-outside'

const NavItems = () => {
    const navRef = useRef<HTMLDivElement | null>(null)
    const [activeIndex, setActiveIndex] = useState<null | number>(null)
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key == "Escape") {
                setActiveIndex(null)
            }
        }
        document.addEventListener("keydown", handler)
        return () => {
            document.removeEventListener("keydown", handler)
        }
    }, [])
    useOnClickOutside(navRef, () => setActiveIndex(null))
    const isAnyOpen = activeIndex !== null
    return (
        <div className='flex gap-4 h-full' ref={navRef}>
            {
                PRODUCT_TYPES.map((type, i) => {
                    const handleOpen = () => {
                        if (activeIndex === i) { setActiveIndex(null) }
                        else setActiveIndex(i)
                    }
                    const isOpen = i === activeIndex


                    return <NavItem type={type} handleOpen={handleOpen} isOpen={isOpen} isAnyOpen={isAnyOpen} key={type.value} />
                })
            }
        </div>
    )
}

export default NavItems
