"use client"
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import Image from "next/image";
import Link from "next/link";
  
  
  
  export default function TableDemo() {
    const data = useQuery(api.documents.getAll);
    const deleteId= useMutation(api.documents.deleteEmployee);
    const da = data?.map(d=>{
        return {...d,_creationTime:new Date(d._creationTime).toISOString()}

    })
    if(data?.length ===0){
       return  (
            <div className="h-full flex flex-col items-center justify-center">
                <div className="w-[300px] h-[300px]">

                <Image src='/no-data.svg' alt="No data available " width={300} height={300} className="object-contain"  />
                </div>
                <p className="font-large text-3xl">No data available</p>
            </div>
        )
    }
    return (
      <Table className="mt-8">
        <TableCaption>A list of your employees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>course</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>creation date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {da?.map((invoice) => (
            <TableRow key={invoice._id}>
                
              <TableCell className="font-medium">{invoice._id}</TableCell>
              <TableCell className="font-medium">{invoice.name}</TableCell>
              <TableCell>{invoice.email}</TableCell>
              <TableCell>{invoice.designation}</TableCell>
              <TableCell>{invoice.gender}</TableCell>
              <TableCell>{invoice.course}</TableCell>
              <TableCell>{invoice.phone}</TableCell>
              <TableCell>{invoice._creationTime.substring(0,10) }</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={()=>deleteId({id:invoice._id})}>Delete</Button>
                <Button variant="link" className="ml-1" asChild>
                    <Link href={`/${invoice._id}`}>
                    Edit
                    </Link>
                    </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    )
  }
  