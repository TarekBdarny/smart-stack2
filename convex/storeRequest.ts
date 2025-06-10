import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const createStoreRequest = mutation({
  args: {
    storeName: v.string(),
    location: v.string(),
    storeImageStorageId: v.optional(v.id("_storage")),
    workHours: v.string(),
    bio: v.string(),
  },
  handler: async (ctx, args) => {
    const authUser = await getCurrentUser(ctx);

    if (!authUser) {
      return null;
    }
    let storeImageUrl = undefined;

    // If image was uploaded, get its URL
    if (args.storeImageStorageId) {
      storeImageUrl = await ctx.storage.getUrl(args.storeImageStorageId);
    }

    const requestId = await ctx.db.insert("StoreRequests", {
      requesterId: authUser._id,
      storeName: args.storeName,
      location: args.location,
      storeImage: storeImageUrl || undefined,
      workHours: args.workHours,
      bio: args.bio,
      status: "PENDING",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return requestId;
  },
});
export const getStoreRequest = query({
  args: { id: v.id("StoreRequests") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
export const getStoreRequests = query({
  args: {},
  handler: async (ctx) => {
    const requests = await ctx.db.query("StoreRequests").collect();
    return Promise.all(
      requests.map(async (request) => {
        const user = await ctx.db.get(request.requesterId);
        let responseByUser = null;
        if (request.responseById) {
          responseByUser = await ctx.db.get(request.responseById);
        }
        return {
          ...request,
          requester: user,
          responseBy: responseByUser || null,
        };
      })
    );
  },
});
