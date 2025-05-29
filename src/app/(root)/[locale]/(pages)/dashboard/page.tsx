import { getAuthUser } from "@/actions/user.action";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import OwnerDashboard from "@/components/dashboard/OwnerDashboard";
import React from "react";

const Dashboard = async () => {
  const user = await getAuthUser();
  return user?.role === "ADMIN" ? (
    <AdminDashboard />
  ) : user?.role === "OWNER" ? (
    <OwnerDashboard />
  ) : (
    <div>Dashboard</div>
  );
};

export default Dashboard;
