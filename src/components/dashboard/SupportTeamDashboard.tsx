"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  ChevronRight,
  Filter,
} from "lucide-react";
import Link from "next/link";
import KanbanBoard from "@/components/grievance/KanbanBoard";
import { Button } from "../ui/Button";

export default function SupportTeamDashboard() {
  const [filterActive, setFilterActive] = useState(false);

  const stats = [
    {
      title: "Assigned to You",
      value: "18",
      icon: MessageSquare,
      color: "text-blue-500",
      description: "Current grievances",
    },
    {
      title: "In Progress",
      value: "7",
      icon: Clock,
      color: "text-yellow-500",
      description: "Being processed",
    },
    {
      title: "Resolved",
      value: "42",
      icon: CheckCircle,
      color: "text-green-500",
      description: "This month",
    },
    {
      title: "Urgent",
      value: "3",
      icon: AlertCircle,
      color: "text-red-500",
      description: "Needs immediate attention",
    },
  ];

  const recentGrievances = [
    {
      id: "GR-2024-045",
      title: "Wi-Fi Connectivity Issue in Library",
      submittedBy: "John Doe",
      submittedAt: "2024-05-14",
      priority: "High",
      status: "New",
    },
    {
      id: "GR-2024-043",
      title: "Classroom Projector Malfunction",
      submittedBy: "Jane Smith",
      submittedAt: "2024-05-13",
      priority: "Medium",
      status: "In Progress",
    },
    {
      id: "GR-2024-040",
      title: "Access Card Not Working",
      submittedBy: "Mike Johnson",
      submittedAt: "2024-05-12",
      priority: "Low",
      status: "In Progress",
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

      <Card>
        <CardHeader>
          <CardTitle>Grievance Kanban Board</CardTitle>
        </CardHeader>
        <CardContent>
          <KanbanBoard />
        </CardContent>
      </Card>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recently Assigned Grievances</CardTitle>
            <Button
              variant={filterActive ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterActive(!filterActive)}
            >
              <Filter className="w-4 h-4 mr-1" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentGrievances.map((grievance) => (
              <div
                key={grievance.id}
                className="flex items-center justify-between p-3 transition-shadow border rounded-lg bg-background hover:shadow-sm"
              >
                <div className="space-y-1">
                  <Link href={`/dashboard/grievances/${grievance.id}`}>
                    <div className="font-medium cursor-pointer hover:text-primary">
                      {grievance.title}
                    </div>
                  </Link>
                  <div className="flex space-x-2 text-sm text-muted-foreground">
                    <span>{grievance.id}</span>
                    <span>•</span>
                    <span>By {grievance.submittedBy}</span>
                    <span>•</span>
                    <span>{grievance.submittedAt}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs px-2 py-1 rounded font-medium 
                    ${
                      grievance.priority === "High"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                        : grievance.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    }`}
                  >
                    {grievance.priority}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded font-medium 
                    ${
                      grievance.status === "New"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                        : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                    }`}
                  >
                    {grievance.status}
                  </span>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Link href="/dashboard/grievances">
              <Button variant="outline">View All Grievances</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
