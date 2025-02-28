"use client";

import { useAuth } from "@/hooks/useAuth"; // You'll need to create this hook
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import SupportTeamDashboard from "@/components/dashboard/SupportTeamDashboard";

export default function Dashboard() {
  const { user, role } = useAuth();
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back, {user.name}!</h1>
          <p className="text-muted-foreground">
            {role === 'admin' 
              ? 'Here\'s an overview of the grievance system' 
              : 'Here\'s your support team dashboard'}
          </p>
        </div>
      </div>
      
      {role === 'admin' ? <AdminDashboard /> : <SupportTeamDashboard />}
    </div>
  );
}
