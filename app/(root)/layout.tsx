"use client"

import { Navbar } from "./_components/Navbar";

const DnsLayout = ({children}:{children:React.ReactNode})=>{
    return (
            <div className="h-full dark:bg-[#1F1F1F]">
                <Navbar />
                <main className="h-full dark:bg-[#1F1F1F] pt-40">
                    {children}
                </main>
            </div>
    )
}

export default DnsLayout;