import { Id } from "../../convex/_generated/dataModel";

export type StoreWithoutUser = {
  _id: Id<"Store">;
  ownerId: Id<"users">;
  storeName: string;
  location: string;
  workHours: string;
  products: Id<"Product">[];
  orders: Id<"Order">[];
  storeImage: string | undefined;
  isOpen: boolean;
  profit: number;
  bio: string;
  _creationTime: number;
  createdAt: number;
  updatedAt: number;
};
