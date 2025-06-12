import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser, getCurrentUserOrThrow } from "./users";

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
  args: {
    orderBy: v.string(),
  },
  handler: async (ctx, { orderBy }) => {
    if (orderBy !== "asc" && orderBy !== "desc") return;
    const requests = await ctx.db
      .query("StoreRequests")
      .order(orderBy)
      .collect();
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
export const getStoreRequestsByStatus = query({
  args: {
    status: v.string(),
    orderBy: v.string(),
    all: v.boolean(),
  },
  handler: async (ctx, { status, all, orderBy }) => {
    let requests = null;
    if (status !== "PENDING" && status !== "APPROVED" && status !== "REJECTED")
      return;
    if (orderBy !== "asc" && orderBy !== "desc") return;
    if (all) {
      requests = await ctx.db.query("StoreRequests").order("desc").collect();
    } else {
      requests = await ctx.db
        .query("StoreRequests")
        .withIndex("by_status", (q) => q.eq("status", status))
        .order("desc")
        .collect();
    }
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
export const approveStoreRequest = mutation({
  args: { requestId: v.id("StoreRequests") },
  handler: async (ctx, { requestId }) => {
    const storeRequest = await ctx.db.get(requestId);

    if (!storeRequest) {
      return {
        message: "Store request not found",
        success: false,
      };
    }
    const userRequest = await ctx.db.get(storeRequest.requesterId);
    if (!userRequest) {
      return {
        message: "Requester not found",
        success: false,
      };
    }

    const adminUser = await getCurrentUserOrThrow(ctx);
    if (adminUser.role !== "ADMIN")
      return {
        message: "Only admin can approve store requests",
        success: false,
      };

    const existingStore = await ctx.db
      .query("Store")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", storeRequest.requesterId))
      .first();
    if (existingStore) {
      return {
        message: "User already has a store",
        success: false,
      };
    }

    await ctx.db.patch(storeRequest._id, {
      status: "APPROVED",
      responseById: adminUser._id,
    });

    // check if the user already has a store

    const newStore = await ctx.db.insert("Store", {
      ownerId: storeRequest.requesterId,
      storeName: storeRequest.storeName,
      location: storeRequest.location,
      storeImage: storeRequest.storeImage || undefined,
      workHours: storeRequest.workHours,
      bio: storeRequest.bio,
      orders: [],
      products: [],
      isOpen: false,
      profit: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    // send email to the store owner

    return {
      success: newStore ? true : false,
      message: newStore
        ? "Store request approved successfully"
        : "Failed to approve request",
    };
  },
});
export const rejectStoreRequest = mutation({
  args: { requestId: v.id("StoreRequests"), cause: v.string() },
  handler: async (ctx, { requestId, cause }) => {
    const storeRequest = await ctx.db.get(requestId);

    if (!storeRequest) {
      return {
        message: "Store request not found",
        success: false,
      };
    }
    const userRequest = await ctx.db.get(storeRequest.requesterId);
    if (!userRequest) {
      return {
        message: "Requester not found",
        success: false,
      };
    }

    const adminUser = await getCurrentUserOrThrow(ctx);
    if (adminUser.role !== "ADMIN")
      return {
        message: "Only admin can reject store requests",
        success: false,
      };

    await ctx.db.patch(storeRequest._id, {
      status: "REJECTED",
      cause,
      responseById: adminUser._id,
    });

    return {
      success: true,
      message: "Store request rejected successfully",
    };
  },
});

export const getStoreOWner = query({
  args: { requestId: v.id("StoreRequests") },
  handler: async (ctx, { requestId }) => {
    const storeRequest = await ctx.db.get(requestId);
    if (!storeRequest) {
      return null;
    }
    const owner = await ctx.db.get(storeRequest.requesterId);
    return owner;
  },
});
