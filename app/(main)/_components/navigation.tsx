"use client"

import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";

import { useMediaQuery } from "usehooks-ts";
import { UserItem } from "./user-item";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export const Navigation =()=>{
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);

    const [isCollapsed,setIsCollapsed] =useState(isMobile);
    const [isResetting,setIsResetting] =useState(false);

    const collapse = ()=>{
        if(sidebarRef.current && navbarRef.current){
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width="0";
            navbarRef.current.style.setProperty("width","100%");
            navbarRef.current.style.setProperty("left","0");
            setTimeout(()=>setIsResetting(false),300);
        }
    }

    const resetWidth = ()=>{
        if(sidebarRef.current && navbarRef.current){
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width= isMobile ?"100%" : "240px";
            navbarRef.current.style.setProperty("width",isMobile ? "0" : "calc(100%-240px)");
            navbarRef.current.style.setProperty("left",isMobile ? "100%" : "240px");

            setTimeout(()=> setIsResetting(false),300);
        }
    }

    useEffect(()=>{
        if(isMobile){
            collapse();
        }else{
            resetWidth();
        }
    },[isMobile]);

    useEffect(()=>{
        if(isMobile){
            collapse()
        }
    },[pathname,isMobile]);

    return (
        <>
        <aside 
        ref={sidebarRef}
        className={cn(
            "h-full group/sidebar bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
            isMobile && "w-0",
            isResetting && "transition-all ease-in-out duration-300"
        )}
        >
            <div role="button" onClick={collapse} className={cn(
            "h-6 w-6 rounded-sm absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100",
           "hover:bg-neutral-300 dark:bg-neutral-600 transition text-muted-foreground",
           isMobile && "opacity-100"
           )}>
                <ChevronLeftIcon className="h-6 w-6" />
              
            </div>
            <div>
               <UserItem />
            </div>
            <div className="mt-4 flex flex-col space-x-1 space-y-2 pl-3">
                   <Button asChild variant="link">
                <Link href="/documents" >
                    Home
                    </Link>
                    </Button>
                    <Button asChild variant="link">
                <Link href="/employees" >
                    Employees List
                    </Link>
                    </Button>
                    <Button asChild >
                <Link href="/create" >
                    Create a employee
                    </Link>
                    </Button>
            </div>
            <div 
            className="opacity-0 group-hover/sidebar:opacity-100 
            transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
            />
        </aside>
        <div 
        ref={navbarRef}
        className={cn(
            "absolute top-0 z-[99999] left-60 w-[calc(100%-240px]",
            isMobile && "left-0 w-full",
            isResetting && "transition-all ease-in-out duration-300"
        )}
        >
            <nav className="w-full bg-transparent py-2 px-3 ">
                {isCollapsed && (
                    <HamburgerMenuIcon role="button" onClick={resetWidth} className="h-6 w-6 text-muted-foreground"/>
                )}
            </nav>

        </div>
        </>
    )
}