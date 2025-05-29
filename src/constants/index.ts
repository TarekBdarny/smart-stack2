import {
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-react";

// This happens ONCE during app setup/deployment
export const plans = {
  EXPLORER: {
    name: "Explorer",
    price: 0,
    maxStores: 0,
    features: {
      support: { level: "community" },
      limits: { maxWishlistItems: 50 },
    },
  },

  STARTER: {
    name: "Starter",
    price: 29.99,
    maxStores: 1,
    features: {
      analytics: { enabled: true, basic: true },
      support: { level: "email" },
      limits: {
        maxProductImages: 5,
        maxStaffPerStore: 2,
        storageGB: 10,
      },
    },
  },

  GROWTH: {
    name: "Growth",
    price: 79.99,
    maxStores: 5,
    features: {
      analytics: { enabled: true, advanced: true },
      support: { level: "priority", phoneSupport: true },
      limits: {
        maxProductImages: 15,
        maxStaffPerStore: 10,
        storageGB: 100,
      },
      integrations: { stripeConnect: true, mailchimp: true },
    },
  },

  ENTERPRISE: {
    name: "Enterprise",
    price: 199.99,
    maxStores: -1, // Unlimited
    features: {
      analytics: { enabled: true, advanced: true, realTime: true },
      support: {
        level: "dedicated",
        phoneSupport: true,
        dedicatedManager: true,
      },
      limits: {
        maxProductImages: -1, // Unlimited
        maxStaffPerStore: -1, // Unlimited
        storageGB: 1000,
      },
      integrations: { stripeConnect: true, mailchimp: true, zapier: true },
      customization: { customThemes: true, customDomain: true },
    },
  },
};

export const customerNavItems = [
  {
    title: "Home",
    url: "/",
    icon: Map,
    isActive: true,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: Frame,
    items: [
      { title: "My Orders", url: "/orders" },
      { title: "Track Order", url: "/orders/track" },
    ],
  },
  {
    title: "Profile",
    url: "/profile",
    icon: SquareTerminal,
    items: [
      { title: "Account Info", url: "/profile" },
      { title: "Settings", url: "/profile/settings" },
    ],
  },
  {
    title: "Help & Support",
    url: "/support",
    icon: BookOpen,
  },
];
export const ownerNavItems = [
  {
    title: "My Store",
    url: "/owner/store",
    icon: GalleryVerticalEnd,
    isActive: true,
    items: [
      { title: "Overview", url: "/owner/store" },
      { title: "Products", url: "/owner/store/products" },
      { title: "Orders", url: "/owner/store/orders" },
    ],
  },
  {
    title: "Analytics",
    url: "/owner/analytics",
    icon: PieChart,
  },
  {
    title: "Plans",
    url: "/owner/plans",
    icon: Bot,
    items: [
      { title: "Current Plan", url: "/owner/plans/current" },
      { title: "Upgrade", url: "/owner/plans/upgrade" },
    ],
  },
  {
    title: "Settings",
    url: "/owner/settings",
    icon: Settings2,
    items: [
      { title: "Store Settings", url: "/owner/settings/store" },
      { title: "Team", url: "/owner/settings/team" },
    ],
  },
];
export const adminNavItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: SquareTerminal,
    isActive: true,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Bot,
    items: [
      { title: "All Users", url: "/admin/users" },
      { title: "Roles", url: "/admin/roles" },
    ],
  },
  {
    title: "Stores",
    url: "/admin/stores",
    icon: Command,
    items: [
      { title: "All Stores", url: "/admin/stores" },
      { title: "Store Requests", url: "/admin/store-requests" },
    ],
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: PieChart,
  },
];
export const staffNavItems = [
  {
    title: "Orders",
    url: "/staff/orders",
    icon: Frame,
    items: [
      { title: "All Orders", url: "/staff/orders" },
      { title: "Pending", url: "/staff/orders/pending" },
      { title: "Completed", url: "/staff/orders/completed" },
    ],
  },
  {
    title: "Products",
    url: "/staff/products",
    icon: GalleryVerticalEnd,
    items: [
      { title: "Inventory", url: "/staff/products" },
      { title: "Categories", url: "/staff/products/categories" },
    ],
  },
  {
    title: "Customers",
    url: "/staff/customers",
    icon: Map,
  },
  {
    title: "Help Desk",
    url: "/staff/support",
    icon: BookOpen,
  },
];
export const generalItems = [
  {
    name: "Home",
    url: "/",
    icon: Home,
    isActive: true,
  },
  {
    name: "Become an owner",
    url: "/become-owner",
    icon: Users,
  },
  {
    name: "Settings",
    url: "/settings",
    icon: Settings2,
  },
];
