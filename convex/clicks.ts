import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const trackClick = mutation({
  args: {
    linkId: v.id("links"),

    country: v.optional(v.string()),

    referrer: v.optional(v.string()),

    device: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("clicks", {
      linkId: args.linkId,

      timestamp: Date.now(),

      country: args.country,

      referrer: args.referrer,

      device: args.device,
    });

    const link = await ctx.db.get(args.linkId);

    if (link) {
      await ctx.db.patch(args.linkId, {
        clicks: link.clicks + 1,
      });
    }
  },
});

import { query } from "./_generated/server";

export const getClicksForLink = query({
  args: {
    linkId: v.id("links"),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("clicks")
      .filter((q) =>
        q.eq(q.field("linkId"), args.linkId)
      )
      .collect();
  },
});

export const getAllClicks = query({
  args: {},

  handler: async (ctx) => {
    return await ctx.db
      .query("clicks")
      .collect();
  },
});

export const getClicksByLink = query({
  args: {
    linkId: v.id("links"),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("clicks")
      .filter((q) =>
        q.eq(
          q.field("linkId"),
          args.linkId
        )
      )
      .collect();
  },
});