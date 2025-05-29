import { mutation, query } from "./_generated/server";
export const createUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identifier = await ctx.auth.getUserIdentity();
    if (!identifier) throw new Error("You must be signed in to create a user");
    const { email, name, profileUrl, subject } = identifier;
    if (!email || !name || !profileUrl || !subject)
      throw new Error("Invalid user data");
    const now = Date.now();
    const existingUser = await ctx.db
      .query("User")
      .filter((q) => q.eq(q.field("email"), email))
      .first();
    if (existingUser)
      return {
        success: false,
        message: "User already exists",
      };
    await ctx.db.insert("User", {
      email,
      name,
      avatar: profileUrl,
      clerkId: subject,
      createdAt: now,
      updatedAt: now,
      role: "CUSTOMER",
    });
    return {
      success: true,
      message: "User created successfully",
    };
  },
});
export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("User").collect();
  },
});
