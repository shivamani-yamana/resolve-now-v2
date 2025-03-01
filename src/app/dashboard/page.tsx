"use client";

import { useAuth } from "@/hooks/useAuth";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import SupportTeamDashboard from "@/components/dashboard/SupportTeamDashboard";

export default function DashboardPage() {
  const { role, user } = useAuth();
  const isAdmin = role === "admin";

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your {isAdmin ? "admin" : "support"} dashboard
        </p>
      </div>

      {isAdmin ? <AdminDashboard /> : <SupportTeamDashboard />}
    </div>
  );
}
