import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
links: defineTable({
  userId: v.string(),

  originalUrl: v.string(),

  shortSlug: v.string(),

  customSlug: v.optional(v.string()),

  clicks: v.number(),

  createdAt: v.number(),

  expiresAt: v.optional(v.number()),

  expired: v.boolean(),
})
  .index("by_slug", ["shortSlug"])
  .index("by_user", ["userId"]),

clicks: defineTable({
  linkId: v.id("links"),

    timestamp: v.number(),

    country: v.optional(v.string()),

    referrer: v.optional(v.string()),

    device: v.optional(v.string()),
  }),

  blockedDomains: defineTable({
    domain: v.string(),
  }),
});

rateLimits: defineTable({
  identifier: v.string(),
  count: v.number(),
  day: v.string(),
})