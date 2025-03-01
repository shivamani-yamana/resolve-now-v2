"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  ChevronRight,
  Filter,
  X,
  Search,
} from "lucide-react";
import Link from "next/link";
import KanbanBoard from "@/components/grievance/KanbanBoard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function SupportTeamDashboard() {
  const [filterActive, setFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string }>(
    {}
  );

  const { user } = useAuth();

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

  const allGrievances = [
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
    {
      id: "GR-2024-039",
      title: "Scholarship Application Issue",
      submittedBy: "Sarah Williams",
      submittedAt: "2024-05-11",
      priority: "Medium",
      status: "Under Review",
      category: "Administration",
    },
    {
      id: "GR-2024-035",
      title: "Library Book Return System Error",
      submittedBy: "David Brown",
      submittedAt: "2024-05-09",
      priority: "Low",
      status: "Resolved",
      category: "Library",
    },
  ];

  // Extract unique priorities and statuses
  const priorities = ["all", ...new Set(allGrievances.map((g) => g.priority))];
  const statuses = ["all", "New", "In Progress", "Under Review", "Resolved"];

  const applyFilter = (type: string, value: string) => {
    switch (type) {
      case "status":
        setStatusFilter(value);
        break;
      case "priority":
        setPriorityFilter(value);
        break;
    }

    if (value === "all") {
      const newFilters = { ...activeFilters };
      delete newFilters[type];
      setActiveFilters(newFilters);
    } else {
      setActiveFilters({ ...activeFilters, [type]: value });
    }
  };

  const clearAllFilters = () => {
    setStatusFilter("all");
    setPriorityFilter("all");
    setSearchQuery("");
    setActiveFilters({});
  };

  const recentGrievances = allGrievances
    .filter((grievance) => {
      // Filter by status
      if (statusFilter !== "all" && grievance.status !== statusFilter) {
        return false;
      }

      // Filter by priority
      if (priorityFilter !== "all" && grievance.priority !== priorityFilter) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          grievance.title.toLowerCase().includes(query) ||
          grievance.id.toLowerCase().includes(query) ||
          grievance.submittedBy.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .slice(0, 5); // Only show up to 5 items

  return (
    <>
      <div className="mb-6">
        <p className="text-muted-foreground">
          Welcome back,{" "}
          <span className="font-medium text-primary">{user?.name}</span>
        </p>
      </div>

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
          {filterActive && (
            <div className="mb-4 space-y-4">
              <div className="flex flex-wrap gap-3">
                <div className="relative w-full max-w-xs">
                  <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search grievances..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Select
                  value={statusFilter}
                  onValueChange={(value) => applyFilter("status", value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === "all" ? "All Statuses" : status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={priorityFilter}
                  onValueChange={(value) => applyFilter("priority", value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority === "all" ? "All Priorities" : priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {Object.keys(activeFilters).length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Active filters:
                  </span>
                  {Object.entries(activeFilters).map(([type, value]) => (
                    <Badge
                      key={type}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {type}: {value}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => applyFilter(type, "all")}
                      />
                    </Badge>
                  ))}
                  {(Object.keys(activeFilters).length > 1 || searchQuery) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="px-2 text-xs h-7"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
              )}

              {searchQuery && !Object.keys(activeFilters).length && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Search:</span>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    &quot;{searchQuery}&quot;
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setSearchQuery("")}
                    />
                  </Badge>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            {recentGrievances.length > 0 ? (
              recentGrievances.map((grievance) => (
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
                          : grievance.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          : grievance.status === "Under Review"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      }`}
                    >
                      {grievance.status}
                    </span>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No grievances found matching your criteria
              </div>
            )}
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
