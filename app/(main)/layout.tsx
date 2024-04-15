"use client"

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Navigation } from "./_components/navigation";

export default function MainLayout({children}:{children:React.ReactNode}){
    const {isLoading,isAuthenticated} =useConvexAuth();
    if(isLoading){
        return (
            <div className="h-ful flex items-center justify-center">
                <p>Loading...</p>
            </div>
        )
    }
    if(!isAuthenticated){
        return redirect("/")
    }
    return (
        <div className="h-full dark:bg-[#1F1F1F] flex">
            <Navigation />
            <main className="h-full overflow-y-auto flex-1">
                {children}
            </main>
        </div>
    )
}