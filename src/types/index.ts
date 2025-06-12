import { z } from "zod";
import { Id } from "../../convex/_generated/dataModel";

export const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  clerkId: z.string(),
  phoneNumber: z.string().max(10).min(10).optional(),
  location: z.string().optional(),
  role: z.enum(["OWNER", "STAFF", "CUSTOMER", "ADMIN"]),
  createdAt: z.number().default(Date.now()),
  updatedAt: z.number().default(Date.now()),
  _creationTime: z.number(),
});
export const StoreWithoutUserSchema = z.object({
  _id: z.string(),
  ownerId: z.string(),
  storeName: z
    .string()
    .min(4, "Store name must be 4 characters or more")
    .max(30, "Store name must be 30 characters or less"),
  location: z.string(),
  workHours: z.string(),
  products: z.array(z.string()).default([]),
  orders: z.array(z.string()).default([]),
  storeImage: z.string().optional(),
  isOpen: z.boolean().default(false),
  profit: z.number().default(0),
  bio: z.string(),
  _creationTime: z.number(),
  createdAt: z.number().default(Date.now()),
  updatedAt: z.number().default(Date.now()),
});
export const StoreWithUserSchema = StoreWithoutUserSchema.extend({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  clerkId: z.string(),
  phoneNumber: z.string().max(10).min(10).optional(),
  location: z.string().optional(),
  role: z.enum(["OWNER", "STAFF", "CUSTOMER", "ADMIN"]),
  createdAt: z.number().default(Date.now()),
  updatedAt: z.number().default(Date.now()),
});
export const RequestCardSchema = z.object({
  bio: z.string(),
  storeName: z.string(),
  location: z.string(),
  storeImage: z.string().optional(),
  workHours: z.string(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
  createdAt: z.number(),
  updatedAt: z.number(),
  requesterId: z.string(),
  responseById: z.string().optional(),
  _creationTime: z.number(),
  requester: UserSchema.optional(),
  responseBy: UserSchema.optional(),
});

export type StoreWithUser = z.infer<typeof StoreWithUserSchema>;

export type StoreWithoutUser = z.infer<typeof StoreWithoutUserSchema>;
export type RequestCardType = z.infer<typeof RequestCardSchema>;
export type User = z.infer<typeof UserSchema>;
