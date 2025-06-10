"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, Store, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

export function StoreSwitcher() {
  const userStore = useQuery(api.store.getStoreForLoggedUser);
  const { isMobile } = useSidebar();

  if (userStore === null) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <User className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    Log in to access your store
                  </span>
                  <span className="truncate text-xs">None</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Sign in
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <div className="flex flex-col  px-2 gap-3 mt-3">
                <Button asChild className="w-full" variant={"action"}>
                  <SignInButton />
                </Button>
                <Button asChild className="w-full" variant={"outline"}>
                  <SignUpButton />
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Store className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {userStore?.storeName}
                </span>
                <span className="truncate text-xs">Starter</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Stores
            </DropdownMenuLabel>

            <DropdownMenuItem key={userStore?.storeName} className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border">
                <Store className="size-3.5 shrink-0" />
              </div>
              {userStore?.storeName}
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <Link href={``} className="gap-2 p-2 flex">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add store</div>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
