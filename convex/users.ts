import {
  internalMutation,
  mutation,
  query,
  QueryCtx,
} from "./_generated/server";
import { UserJSON } from "@clerk/backend";
import { v, Validator } from "convex/values";
// export const createUser = mutation({
//   args: {},
//   handler: async (ctx): Promise<{ message: string; success: boolean }> => {
//     const identifier = await ctx.auth.getUserIdentity();
//     if (!identifier) throw new Error("You must be signed in to create a user");
//     const { email, name, profileUrl, subject } = identifier;
//     if (!email || !name || !profileUrl || !subject)
//       throw new Error("Invalid user data");
//     const now = Date.now();
//     const existingUser = await ctx.db
//       .query("users")
//       .filter((q) => q.eq(q.field("email"), email))
//       .first();
//     if (existingUser)
//       return {
//         success: false,
//         message: "User already exists",
//       };
//     await ctx.db.insert("users", {
//       email,
//       name,
//       avatar: profileUrl,
//       clerkId: subject,
//       createdAt: now,
//       updatedAt: now,
//       role: "CUSTOMER",
//     });
//     return {
//       success: true,
//       message: "User created successfully",
//     };
//   },
// });
export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});
export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    return Promise.all(
      users.map(async (user) => {
        const store = await ctx.db
          .query("Store")
          .withIndex("by_ownerId", (q) => q.eq("ownerId", user._id))
          .first();
        return { ...user, store };
      })
    );
  },
});
export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> },
  handler: async (ctx, { data }) => {
    const user = await getUserByClerkId(ctx, data.id);
    const userAttributes = {
      email: data.email_addresses[0].email_address,
      clerkId: data.id,
      name: user?.name || `${data.first_name} ${data.last_name}`,
      avatar: data.image_url || undefined,
      createdAt: user?.createdAt || Date.now(),
      updatedAt: Date.now(),
    };
    if (user === null) {
      //insert
      console.log("i am in the if check");
      await ctx.db.insert("users", {
        ...userAttributes,
        role: "CUSTOMER",
      });
    } else {
      //update
      await ctx.db.patch(user._id, userAttributes);
    }
  },
});
export const deleteFromClerk = internalMutation({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    const user = await getUserByClerkId(ctx, clerkId);
    if (user !== null) {
      await ctx.db.delete(user._id);
    } else {
      console.warn(
        `Can't delete user, there is none for Clerk user ID: ${clerkId}`
      );
    }
  },
});
export const getUserByClerkId = async (ctx: QueryCtx, clerkId: string) => {
  return await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
    .unique();
};
export const getUserIdByClerkId = async (ctx: QueryCtx, clerkId: string) => {
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
    .unique();
  return user?._id;
};

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await getUserByClerkId(ctx, identity.subject);
}
export const getUserByName = query({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_name", (q) => q.eq("name", name))
      .unique();
  },
});
export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, { id }) => {
    const user = await ctx.db.get(id);
    if (!user) throw new Error("User not found");
    return await ctx.db.delete(id);
  },
});
