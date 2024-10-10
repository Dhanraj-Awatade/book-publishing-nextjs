import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomepageBanner = () => {
    return (
        <div className='shadow'>
            <Link href={"/book/67082b77b76f8544ad8b95dc"} >
                <Image src={"/Images/Shabdashivar_Ad.png"} alt='Shabdashivar Ad Banner' height={80} width={3241} />
            </Link>
        </div>
    )
}

export default HomepageBanner
