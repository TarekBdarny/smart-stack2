import { User } from "@/types";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
export const isAdmin = (user: User): boolean => {
  if (!user) {
    return false;
  }
  return user.role === "ADMIN";
};
export const isOwner = (user: User): boolean => {
  if (!user) {
    return false;
  }
  return user.role === "OWNER";
};
export const isStaff = (user: User): boolean => {
  if (!user) {
    return false;
  }
  return user.role === "STAFF";
};
export const isCustomer = (user: User): boolean => {
  if (!user) {
    return false;
  }
  return user.role === "CUSTOMER";
};
export const isAllowedToAdminRoutes = (user: User): boolean => {
  return isAdmin(user);
};
export const isAllowedToDeleteStore = (user: User): boolean => {
  return isAdmin(user) || isOwner(user);
};
export const isAllowedToBecomeAnOwner = async (
  user: User
): Promise<boolean> => {
  const hasStore = await preloadQuery(api.store.userHasStore, {
    ownerId: user._id as Id<"users">,
  });
  return (!hasStore && isOwner(user)) || isStaff(user) || isCustomer(user);
};
