import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { reservedSlugs } from "../src/utils/reservedSlugs";

export const createLink = mutation({
  args: {
    userId: v.string(),
    originalUrl: v.string(),
    shortSlug: v.string(),
    expiresAt: v.optional(v.number()),
  },

  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("links")
      .withIndex("by_slug", (q) =>
        q.eq("shortSlug", args.shortSlug)
      )
      .unique();

    if (existing) {
      throw new Error("Slug already exists");
    }

    if (reservedSlugs.includes(args.shortSlug)) {
      throw new Error("Slug is reserved");
    }
    
    return await ctx.db.insert("links", {
      userId: args.userId,
      originalUrl: args.originalUrl,
      shortSlug: args.shortSlug,
      clicks: 0,
      createdAt: Date.now(),
      expiresAt: args.expiresAt,
      expired: false,
    });
  },
});

export const getUserLinks = query({
  args: {
    userId: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("links")
      .withIndex("by_user", (q) =>
        q.eq("userId", args.userId)
      )
      .collect();
  },
});

export const getLinkBySlug =
  query({
    args: {
      slug: v.string(),
    },

    handler: async (
      ctx,
      args
    ) => {
      return await ctx.db
        .query("links")
        .withIndex(
          "by_slug",
          (q) =>
            q.eq(
              "shortSlug",
              args.slug
            )
        )
        .unique();
    },
  });

export const deleteLinks = mutation({
  args: {
    ids: v.array(v.id("links")),
  },

  handler: async (ctx, args) => {
    for (const id of args.ids) {
      await ctx.db.delete(id);
    }
  },
});