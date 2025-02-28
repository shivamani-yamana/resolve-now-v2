"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FileText, CheckCircle, BarChart3, Users, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Grievances",
      value: "156",
      icon: FileText,
      color: "text-blue-500",
      description: "All submitted complaints",
    },
    {
      title: "Active Teams",
      value: "8",
      icon: Users,
      color: "text-purple-500",
      description: "Support teams handling cases",
    },
    {
      title: "Resolved",
      value: "124",
      icon: CheckCircle,
      color: "text-green-500",
      description: "Successfully addressed",
    },
    {
      title: "Resolution Rate",
      value: "79%",
      icon: BarChart3,
      color: "text-amber-500",
      description: "Average resolution time: 3.5 days",
    },
  ];

  const teamPerformance = [
    {
      id: "team-1",
      name: "Technical Support",
      assignedCases: 32,
      resolvedCases: 27,
      averageResolutionTime: "2.1 days",
      satisfaction: "4.2/5",
    },
    {
      id: "team-2",
      name: "Academic Affairs",
      assignedCases: 45,
      resolvedCases: 38,
      averageResolutionTime: "3.7 days",
      satisfaction: "3.8/5",
    },
    {
      id: "team-3",
      name: "Facilities Management",
      assignedCases: 28,
      resolvedCases: 22,
      averageResolutionTime: "4.2 days",
      satisfaction: "3.5/5",
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

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Team Performance</CardTitle>
              <Link href="/dashboard/teams">
                <Button variant="outline" size="sm">
                  View All Teams
                </Button>
              </Link>
            </div>
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
      </div>

      <Card>
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
