import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const UserRole = v.union(
  v.literal("ADMIN"),
  v.literal("OWNER"),
  v.literal("STAFF"),
  v.literal("CUSTOMER")
);

const OrderStatus = v.union(
  v.literal("PENDING"),
  v.literal("COMPLETED"),
  v.literal("CANCELLED")
);

const RequestStatus = v.union(
  v.literal("PENDING"),
  v.literal("APPROVED"),
  v.literal("REJECTED")
);

const PlanStatus = v.union(
  v.literal("ACTIVE"),
  v.literal("INACTIVE"),
  v.literal("CANCELLED"),
  v.literal("PAST_DUE")
);

const PlanType = v.union(v.literal("Starter"));

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    avatar: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    location: v.optional(v.string()),
    role: UserRole,
    clerkId: v.string(),
    createdAt: v.number(), // timestamp
    updatedAt: v.number(), // timestamp
  })
    .index("by_email", ["email"])
    .index("by_clerkId", ["clerkId"])
    .index("by_phoneNumber", ["phoneNumber"])
    .index("by_name", ["name"]),

  Store: defineTable({
    ownerId: v.id("users"), // 1:1 relationship - each user has one store
    storeName: v.string(),
    location: v.string(),
    workHours: v.string(),
    products: v.array(v.id("Product")),
    orders: v.array(v.id("Order")),
    storeImage: v.optional(v.string()),
    isOpen: v.boolean(),
    profit: v.number(),
    bio: v.string(),
    createdAt: v.number(), // timestamp
    updatedAt: v.number(), // timestamp
  })
    .index("by_ownerId", ["ownerId"])
    .index("by_isOpen", ["isOpen"])
    .index("by_storeName", ["storeName"]),

  StoreRequests: defineTable({
    requesterId: v.id("users"),
    responseById: v.optional(v.id("users")),
    description: v.optional(v.string()),
    storeName: v.string(),
    location: v.string(),
    workHours: v.string(),
    bio: v.string(),
    status: RequestStatus,
    createdAt: v.number(), // timestamp
    updatedAt: v.number(), // timestamp
  })
    .index("by_requesterId", ["requesterId"])
    .index("by_responseById", ["responseById"])
    .index("by_status", ["status"]),

  Subscriptions: defineTable({
    userId: v.id("users"),
    storeId: v.id("stores"), // One subscription per store
    planType: PlanType,
    price: v.number(), // Fixed price instead of plan table
    status: PlanStatus,
    startDate: v.number(), // timestamp
    endDate: v.optional(v.number()), // timestamp, null for active subscriptions
    cancelledAt: v.optional(v.number()), // timestamp
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    createdAt: v.number(), // timestamp
    updatedAt: v.number(), // timestamp
  })
    .index("by_userId", ["userId"])
    .index("by_storeId", ["storeId"])
    .index("by_status", ["status"])
    .index("by_planType", ["planType"]),

  Category: defineTable({
    name: v.string(),
  }).index("by_name", ["name"]),

  Product: defineTable({
    productName: v.string(),
    stock: v.number(),
    quantity: v.number(),
    price: v.number(),
    boughtPrice: v.number(), // price that product was bought at
    minStock: v.number(),
    createdAt: v.number(), // timestamp
    storeId: v.id("Store"),
    categoryId: v.id("Category"),
  })
    .index("by_storeId", ["storeId"])
    .index("by_categoryId", ["categoryId"])
    .index("by_productName", ["productName"]),

  Order: defineTable({
    price: v.number(),
    status: OrderStatus,
    customerId: v.id("users"),
    storeHistoryId: v.id("storeHistories"),
    orderItems: v.array(v.id("OrderItems")),
    storeId: v.id("Store"),
    createdAt: v.number(), // timestamp
  })
    .index("by_customerId", ["customerId"])
    .index("by_storeHistoryId", ["storeHistoryId"])
    .index("by_storeId", ["storeId"])
    .index("by_status", ["status"]),

  orderItems: defineTable({
    orderId: v.id("Order"),
    productId: v.id("Product"),
    quantity: v.number(),
    price: v.number(),
  })
    .index("by_orderId", ["orderId"])
    .index("by_productId", ["productId"]),

  storeHistories: defineTable({
    storeId: v.id("Store"),
    orders: v.array(v.id("Order")),
  }).index("by_storeId", ["storeId"]),
});
