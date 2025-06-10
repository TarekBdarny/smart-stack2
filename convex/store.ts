// import { v } from "convex/values";
import { query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const getStoreForLoggedUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      console.warn("No user found");
      return null;
    }
    const userStore = await ctx.db
      .query("Store")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", user._id))
      .first();
    return userStore;
  },
});
