import { v } from "convex/values";
import {mutation,query} from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";


export const create = mutation({
    args : {
        name:v.string(),
        email:v.string(),
        designation:v.string(),
        course:v.array(v.string()),
        gender:v.string(),
        image:v.string(),
        phone:v.union(v.string(),v.number()),
    },
    handler: async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not Authenticated");
        }
        const userId = identity.subject;
        const {email} =args;
        const user = await ctx.db.query('documents')
        .filter((q)=>q.eq(q.field('email'),email))
        .unique();
        if(user){
            throw new Error("Email already exists")
        }
        await ctx.db.insert("documents",{email:args.email,name:args.name,course:args.course,gender:args.gender,
            image:args.image,phone:args.phone,userId:userId,designation:args.designation
        })
        
    }
})

export const update= mutation({
    args:{
        id:v.id("documents"),
        name:v.string(),
        email:v.string(),
        designation:v.string(),
        course:v.array(v.string()),
        gender:v.string(),
        image:v.string(),
        phone:v.union(v.string(),v.number()),
    },
    handler: async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not Authenticated");
        }
        const userId = identity.subject;
        const {id,name,...other}=args;
        await ctx.db.patch(id, {...other})  
    }
})

export const deleteEmployee = mutation({
    args: {id: v.id("documents")},
    handler: async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated");
        }
        await ctx.db.delete(args.id)
    }
})

export const getAll = query({
    handler : async (ctx)=>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated");
        }  

        const documents = await ctx.db.query("documents").collect();
        return documents;
    }
})

export const getById = query({
    args:{id:v.id("documents")},
    handler: async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not authenticated");
        }  
        const document= await ctx.db.get(args.id);
        return document;
    }
})