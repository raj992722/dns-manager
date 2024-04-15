import {defineSchema, defineTable} from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents:defineTable({
        address:v.string(),
        ipv6_address:v.string(),
        canonical_name:v.string(),
        mail_exchange:v.string(),
        name_server:v.string(),
        pointer:v.string(),
        start_of_authority:v.string(),
        service:v.string(),
        text:v.string(),
        dnssec:v.string(),
        userId:v.string()
    })
    .index("by_user",["userId"])
})