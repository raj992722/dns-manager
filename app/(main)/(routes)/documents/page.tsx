"use client"
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
 import Image from "next/image";

const DocumentsPage= ()=>{
    const {user} = useUser();
    return (
        <div className="h-full flex items-center flex-col justify-center space-y-4">
            <div className="flex">
            <Image 
            src="/add-notes.svg"
            alt="add notes"
            width="300"
            height="300"
            />
             <Image 
            src="/no-data.svg"
            alt="add notes"
            width="300"
            height="300"
            className=" hidden md:block"
            />
            </div>

            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s DNS Manager
            </h2>
            <Button>
                <PlusCircledIcon className="h-4 w-4 mr-2"/>
                Create
            </Button>
        </div>
    )
}

export default DocumentsPage;