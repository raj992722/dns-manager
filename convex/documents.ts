import { v } from "convex/values";
import {mutation,query} from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const create = mutation({
    args : {

    },
    handler: async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Not Authenticated");
        }
        
    }
})