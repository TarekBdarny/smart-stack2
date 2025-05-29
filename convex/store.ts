// import { v } from "convex/values";
import { query } from "./_generated/server";

export const getStoreById = query({
  args: {},
  handler: async (ctx) => {
    const stores = await ctx.db.query("Store").collect();
    return Promise.all(
      stores.map(async (store) => {
        const owner = await ctx.db.get(store.ownerId);
        return { ...store, owner };
      })
    );
  },
});
