import {defineSchema, defineTable} from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents:defineTable({
        name:v.string(),
        email:v.string(),
        designation:v.string(),
        course:v.array(v.string()),
        gender:v.string(),
        image:v.string(),
        phone:v.union(v.string(),v.number()),
        userId:v.string()
    })
    .index("by_user",["userId"])
    .index("by_email",["email"])
})