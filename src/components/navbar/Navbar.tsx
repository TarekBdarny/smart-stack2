import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ThemeSwitcher } from "../ThemeSwithcer";

const Navbar = async () => {
  return (
    <>
      <div
        className={`w-full h-16 flex items-center px-4 justify-between py-4`}
      >
        <div>
          <SidebarTrigger />
        </div>
        <div className="flex gap-4">
          <div>
            <ThemeSwitcher />
          </div>
          <div className="flex gap-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button asChild variant={"action"}>
                <SignInButton mode="modal" />
              </Button>
              <Button
                asChild
                variant={"outline"}
                className="hover:bg-primary/50"
              >
                <SignUpButton mode="modal" />
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Navbar;
