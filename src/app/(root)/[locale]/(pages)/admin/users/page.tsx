"use client";
import { getAllUsers } from "@/actions/user.action";
import UserCard, { UserProps } from "@/components/UserCard";
import { supabaseClient } from "@/utils/supabaseClient";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect } from "react";

const AllUsersPage = () => {
  const [users, setUsers] = React.useState<UserProps[]>([]);
  const { getToken } = useAuth();
  const [token, setToken] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const tempToken = await getToken({ template: "supabase" });
      setToken(tempToken);

      const data = await getAllUsers();
      if (data) setUsers(data);
    };
    fetchUsers();
  }, [getToken]);

  useEffect(() => {
    console.log("token", token);
    const supabase = supabaseClient(token!);
    const channel = supabase
      .channel("realtime-users")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "User",
        },
        (payload) => {
          console.log("Full payload:", payload);
          console.log("Event type:", payload.eventType);
          console.log("New data:", payload.new);
          console.log("Schema:", payload.schema);
          console.log("Table:", payload.table);
          setUsers((prev) => [...prev, payload.new as UserProps]);
        }
      )
      .subscribe((status) => console.log(status));
    return () => {
      channel.unsubscribe();
    };
  }, [token]);
  return (
    <div className="w-full  grid grid-cols-[repeat(auto-fit,400px)] justify-center gap-4">
      {users?.map((user, index) => (
        <UserCard key={index} user={user} storeId={user.storeId} />
      ))}
      {users.length === 0 && <div>No users found</div>}
    </div>
  );
};

export default AllUsersPage;
