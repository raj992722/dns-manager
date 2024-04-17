"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { formSchema } from "../../_components/form";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const course = [
    {
    id:"MCA",
    label:"MCA"
    
  },
  {
    id:"BCA",
    label:"BCA"
  },
  {
    id:"BSC",
    label:"BSC"
  }
] as const;


const Employee = ({params}:{params:{employeeId:Id<"documents">}})=>{
        const valued= useQuery(api.documents.getById,{id:params.employeeId});
       console.log(valued)
        
        const updated= useMutation(api.documents.update);

        const onSubmit = async (values:z.infer<typeof formSchema>)=>{
            const promise = updated({...values,id:params.employeeId});
            toast.promise(promise,{
                loading:"Updating...",
                success:"updated successfully!",
                error:"error in updating"
            })
        }

        const form = useForm<z.infer<typeof formSchema>>({
            resolver:zodResolver(formSchema),
            defaultValues:{
                name:valued?.name,
                email:valued?.email,
                phone:valued?.phone,
                designation:valued?.designation,
                course:valued?.course,
                gender:valued?.gender || "F"
            }
            
            
            
            
            
               


           
        })

        return (
            <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-8 w-2/3  shadow-md rounded-md p-2">
                <FormField
                 control={form.control}
                name="name"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter name" {...field}/>
                        </FormControl>
                        <FormDescription>
                            This is your username
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField 
                   control={form.control}
                name="email"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter email" {...field}/>
                        </FormControl>
                        <FormDescription>
                            This is your email
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField 
                 control={form.control}
                name="phone"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Mobile No.</FormLabel>
                        <FormControl>
                            <Input  placeholder="Enter mobile number" {...field}/>
                        </FormControl>
                        <FormDescription>
                            This is your mobile number
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField 
                 control={form.control}
                name="designation"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Designation</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a designation"/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="HR" >HR</SelectItem>
                            <SelectItem value="Manager" >Manager</SelectItem>
                            <SelectItem value="Sales" >Sales</SelectItem>
                        </SelectContent>
                        </Select>
                        
                        <FormDescription>
                            This is your designation
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField 
                  control={form.control}
                  name="course"
                  render={()=>(
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">Course</FormLabel>
                            <FormDescription>
                                Select the courses you are eligible
                            </FormDescription>
                        </div>
                        {course.map(cou=>(
                            <FormField  
                            key={cou.id}
                            control={form.control}
                            name="course"
                            render={({field})=>{
                                return (
                                    <FormItem 
                                    key={cou.id}
                                    className="flex items-start space-x-3 space-y-0"
                                    >
                                        <FormControl>
                                            <Checkbox 
                                            checked={field.value?.includes(cou.id)}
                                            onCheckedChange={(checked)=>{
                                                return checked 
                                                   ? field.onChange([...field.value,cou.id])
                                                   : field.onChange(
                                                    field.value?.filter(
                                                        (value)=>value !== cou.id
                                                    )
                                                   )
                                            }}
                                            />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">{cou.label}</FormLabel>
                                    </FormItem>
                                )
                            }}
                            />
                        ))}
                    </FormItem>
                  )}
                />

                <FormField  
                name="gender"
                control={form.control}
                render={({field})=>(
                    <FormItem className="space-y-3">
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                            <RadioGroup 
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                            >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="M"/>
                                    </FormControl>
                                    <FormLabel>Male</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="F"/>
                                    </FormControl>
                                    <FormLabel>Female</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="Other"/>
                                    </FormControl>
                                    <FormLabel>Other</FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )}
                
                />
                <FormField 
                name="image"
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Upload a picture</FormLabel>
                        <FormControl>
                            <Input type="file" placeholder="Choose a image" {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Update</Button>
                <Button asChild>
                    <Link href="/employees">Cancel</Link>
                </Button>
            </form>
        </Form>
        )
}

export default Employee;