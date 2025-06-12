"use client";
import UserCard from "@/components/UserCard";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../convex/_generated/api";
import { isAdmin } from "@/lib/auth";
import { notFound } from "next/navigation";

const AllUsersPage = () => {
  const users = useQuery(api.users.getAllUsers);
  const authUser = useQuery(api.users.current);
  if (!authUser) return;
  if (!isAdmin(authUser)) {
    notFound();
  }
  return (
    <div className="w-full  grid grid-cols-[repeat(auto-fit,400px)] justify-center gap-4">
      {users?.map((user, index) => (
        <UserCard
          key={index}
          user={user}
          store={user.store?.storeName !== undefined}
        />
      ))}
      {users?.length === 0 && <div>No users found</div>}
    </div>
  );
};

export default AllUsersPage;
