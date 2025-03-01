"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Users, FileText, BarChart3, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  // Stats data
  const stats = [
    {
      title: "Total Users",
      value: "120",
      icon: Users,
      color: "text-blue-500",
      description: "+5% from last month",
    },
    {
      title: "Open Grievances",
      value: "24",
      icon: FileText,
      color: "text-yellow-500",
      description: "-2% from last week",
    },
    {
      title: "Resolution Rate",
      value: "89%",
      icon: BarChart3,
      color: "text-green-500",
      description: "+2% from last month",
    },
    {
      title: "Urgent Issues",
      value: "7",
      icon: AlertCircle,
      color: "text-red-500",
      description: "Needs attention",
    },
  ];

  // Recent grievances data
  const recentGrievances = [
    {
      id: "GR-2024-045",
      title: "Wi-Fi Connectivity Issue in Library",
      submittedBy: "John Doe",
      submittedAt: "2024-05-14",
      priority: "High",
      status: "New",
      category: "IT",
    },
    {
      id: "GR-2024-043",
      title: "Classroom Projector Malfunction",
      submittedBy: "Jane Smith",
      submittedAt: "2024-05-13",
      priority: "Medium",
      status: "In Progress",
      category: "IT",
    },
    {
      id: "GR-2024-040",
      title: "Access Card Not Working",
      submittedBy: "Mike Johnson",
      submittedAt: "2024-05-12",
      priority: "Low",
      status: "In Progress",
      category: "Security",
    },
  ];

  // Team performance data
  const teamPerformance = [
    {
      id: "team-1",
      name: "IT Support Team",
      assignedCases: 45,
      resolvedCases: 38,
      averageResolutionTime: "1.8 days",
      satisfaction: "4.7/5",
    },
    {
      id: "team-2",
      name: "Facilities Management",
      assignedCases: 32,
      resolvedCases: 27,
      averageResolutionTime: "2.3 days",
      satisfaction: "4.2/5",
    },
    {
      id: "team-3",
      name: "Administrative Support",
      assignedCases: 18,
      resolvedCases: 15,
      averageResolutionTime: "1.5 days",
      satisfaction: "4.5/5",
    },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="transition-shadow hover:shadow-lg"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Grievances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentGrievances.map((grievance) => (
              <div
                key={grievance.id}
                className="pb-4 border-b last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium">{grievance.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {grievance.id}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">By: </span>
                    {grievance.submittedBy}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date: </span>
                    {grievance.submittedAt}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Priority: </span>
                    <span
                      className={`${
                        grievance.priority === "High"
                          ? "text-red-500"
                          : grievance.priority === "Medium"
                          ? "text-yellow-500"
                          : "text-blue-500"
                      }`}
                    >
                      {grievance.priority}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status: </span>
                    {grievance.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamPerformance.map((team) => (
              <div
                key={team.id}
                className="pb-4 border-b last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{team.name}</div>
                  <Link href={`/dashboard/teams/${team.id}`}>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Assigned: </span>
                    {team.assignedCases}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Resolved: </span>
                    {team.resolvedCases}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Avg Time: </span>
                    {team.averageResolutionTime}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rating: </span>
                    {team.satisfaction}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* 
      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Management</CardTitle>
              <Link href="/dashboard/users">
                <Button variant="outline" size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">Admin Users</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">
                      Support Staff
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-2">
              <Link href="/dashboard/users/create">
                <Button size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-1" /> Add New User
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Category Distribution</CardTitle>
              <Button variant="ghost" size="icon">
                <BarChart3 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-[200px] flex items-center justify-center text-muted-foreground bg-muted/30 rounded-md">
              Chart will be implemented here
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Link href="/dashboard/categories">
                  <Button variant="outline" size="sm">
                    Manage Categories
                  </Button>
                </Link>
                <Link href="/dashboard/teams/create">
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-1" /> Create Team
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}

      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Monthly Grievance Trends</CardTitle>
            <Button variant="outline" size="sm">
              Export Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground bg-muted/30 rounded-md">
            Trend chart will be implemented here
          </div>
        </CardContent>
      </Card>
    </>
  );
}
