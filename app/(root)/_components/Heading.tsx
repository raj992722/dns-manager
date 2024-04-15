"use client"

import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/clerk-react"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { useConvexAuth } from "convex/react"
import Link from "next/link"


export const Heading = ()=>{
    const {isAuthenticated,isLoading} =useConvexAuth()
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Welcome to your 
                <span className="underline ml-2">DNS Manager</span>
            </h1>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <p>Loading...</p>
                </div>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button>
                        Get DNS Manager for free
                    </Button>
                </SignInButton>
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                      Enter DNS Manager
                      <ArrowRightIcon className="h-4 w-4 ml-2"/>
                    </Link>
                   
                </Button>
            )}
            
        </div>
    )
}