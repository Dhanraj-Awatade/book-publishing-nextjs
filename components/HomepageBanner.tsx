import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomepageBanner = () => {
    return (
        <div className='shadow'>
            <Link href={"/book/67082b77b76f8544ad8b95dc"} >
                <Image src={"/Images/Shabdashivar_Ad.png"} className='hidden md:block' alt='Shabdashivar Ad Banner' height={120} width={3241} />
                <Image src={"/Images/Shabdashivar_Ad_mobile.png"} className='md:hidden' alt='Shabdashivar Mobile Ad Banner' height={236} width={1080} quality={100} />
            </Link>
        </div>
    )
}

export default HomepageBanner
