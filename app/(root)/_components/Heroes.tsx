"use client"

import Image from "next/image"

export const Heroes = ()=>{

    return (
        <div className="flex justify-center flex-col max-w-5xl items-center">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px]
                     md:w-[400px] md:h-[400px]">
                    <Image src="/join-team.svg" alt="Join team" 
                    fill
                    className="object-contain" />
                    
                </div>
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px]
                     md:w-[400px] md:h-[400px] hidden md:block">
                    <Image src="/dns.svg" alt="dns team" 
                    fill
                    className="object-contain" />
                    
                </div>
            </div>
        </div>
    )
}