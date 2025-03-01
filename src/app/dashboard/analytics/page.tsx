"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month");

  // Sample data - In a real app, this would come from an API
  const grievanceByCategory = [
    { name: "IT", value: 35 },
    { name: "Education", value: 25 },
    { name: "Infrastructure", value: 15 },
    { name: "Administration", value: 20 },
    { name: "Finance", value: 5 },
  ];

  const grievanceByStatus = [
    { name: "New", value: 15 },
    { name: "In Progress", value: 30 },
    { name: "Under Review", value: 25 },
    { name: "Resolved", value: 30 },
  ];

  const grievanceByPriority = [
    { name: "Low", value: 25 },
    { name: "Medium", value: 50 },
    { name: "High", value: 25 },
  ];

  const monthlyData = [
    { name: "Jan", count: 12 },
    { name: "Feb", count: 19 },
    { name: "Mar", count: 15 },
    { name: "Apr", count: 22 },
    { name: "May", count: 28 },
    { name: "Jun", count: 23 },
    { name: "Jul", count: 34 },
    { name: "Aug", count: 30 },
    { name: "Sep", count: 25 },
    { name: "Oct", count: 31 },
    { name: "Nov", count: 42 },
    { name: "Dec", count: 35 },
  ];

  const weeklyData = [
    { name: "Mon", count: 5 },
    { name: "Tue", count: 7 },
    { name: "Wed", count: 10 },
    { name: "Thu", count: 8 },
    { name: "Fri", count: 12 },
    { name: "Sat", count: 3 },
    { name: "Sun", count: 2 },
  ];

  const teamPerformance = [
    { name: "Technical Support", resolved: 45, average: 3.2 },
    { name: "Academic Affairs", resolved: 32, average: 4.1 },
    { name: "Facilities", resolved: 28, average: 2.8 },
    { name: "Administration", resolved: 37, average: 3.5 },
    { name: "Finance", resolved: 19, average: 5.2 },
  ];

  // Colors for pie charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
  const STATUS_COLORS = {
    New: "#3b82f6",
    "In Progress": "#f59e0b",
    "Under Review": "#8b5cf6",
    Resolved: "#10b981",
  };
  const PRIORITY_COLORS = {
    Low: "#10b981",
    Medium: "#f59e0b",
    High: "#ef4444",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Insights and metrics about the grievance system
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Total Grievances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">347</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from previous month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Resolution Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              +2.3% from previous month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Avg. Resolution Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.5 days</div>
            <p className="text-xs text-muted-foreground">
              -0.8 days from previous month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="performance">Team Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Grievances Over Time</CardTitle>
                <CardDescription>
                  Number of grievances reported over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 h-[300px]">
                <div className="mb-4 space-x-2">
                  <button
                    onClick={() => setTimeRange("week")}
                    className={`px-3 py-1 text-sm rounded-md ${
                      timeRange === "week"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setTimeRange("month")}
                    className={`px-3 py-1 text-sm rounded-md ${
                      timeRange === "month"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeRange === "month" ? monthlyData : weeklyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#8884d8"
                      name="Grievances"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Grievances by Status</CardTitle>
                <CardDescription>
                  Distribution of grievances by current status
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={grievanceByStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({
                        name,
                        percent,
                      }: {
                        name: string;
                        percent: number;
                      }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {grievanceByStatus.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            STATUS_COLORS[
                              entry.name as keyof typeof STATUS_COLORS
                            ] || COLORS[index % COLORS.length]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Grievances by Category</CardTitle>
                <CardDescription>
                  Number of grievances reported by category
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={grievanceByCategory}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Grievances" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Grievances by Priority</CardTitle>
                <CardDescription>
                  Distribution of grievances by assigned priority
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={grievanceByPriority}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({
                        name,
                        percent,
                      }: {
                        name: string;
                        percent: number;
                      }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {grievanceByPriority.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            PRIORITY_COLORS[
                              entry.name as keyof typeof PRIORITY_COLORS
                            ] || COLORS[index % COLORS.length]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>
                Resolution metrics for each support team
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={teamPerformance}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="resolved"
                    name="Grievances Resolved"
                    fill="#8884d8"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="average"
                    name="Avg. Resolution Time (days)"
                    fill="#82ca9d"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                  Teams with fastest resolution times
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformance
                    .sort((a, b) => a.average - b.average)
                    .slice(0, 3)
                    .map((team, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {team.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {team.resolved} grievances resolved
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium leading-none">
                            {team.average} days
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Avg. resolution time
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
                <CardDescription>
                  Teams with slower resolution times
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformance
                    .sort((a, b) => b.average - a.average)
                    .slice(0, 3)
                    .map((team, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {team.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {team.resolved} grievances resolved
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium leading-none">
                            {team.average} days
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Avg. resolution time
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
