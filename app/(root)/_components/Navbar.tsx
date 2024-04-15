"use client"

import Link from "next/link";
import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/ModeToggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";


export const Navbar = ()=>{
    const scrolled = useScrollTop();
    const {isAuthenticated, isLoading} = useConvexAuth();
    return (
        <div className={cn(
            "z-50 bg-background fixed  dark:bg-[#1F1F1F] top-0 p-6 w-full flex items-center",
            scrolled && "border-b dark:border-neutral-700 shadow-sm dark:shadow-white"
        )}>
           <Logo />
           <div className="md:ml-auto flex justify-between md:justify-end items-center gap-x-2 w-full ">
                {isLoading && (
                    <p>Loading...</p>
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                    <SignInButton mode="modal">
                        <Button variant="ghost" size="sm">
                            Log in
                        </Button>
                    </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                    <Button  size='sm' asChild >
                        <Link href="/documents" >
                            Enter DNS Manager
                        </Link>
                    </Button>
                    <UserButton afterSignOutUrl="/" />
                    </>
                )}
                <ModeToggle />
           </div>

        </div>
    )
}