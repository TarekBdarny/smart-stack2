import {
  adminNavItems,
  customerNavItems,
  ownerNavItems,
  staffNavItems,
} from "@/constants";

export function getNavItemsByRole(
  role: "ADMIN" | "OWNER" | "STAFF" | "CUSTOMER"
) {
  switch (role) {
    case "ADMIN":
      return adminNavItems;
    case "OWNER":
      return ownerNavItems;
    case "CUSTOMER":
      return customerNavItems;
    case "STAFF":
      return staffNavItems;
    default:
      return [];
  }
}
