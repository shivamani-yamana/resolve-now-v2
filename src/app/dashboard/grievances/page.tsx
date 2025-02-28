"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  MessageCircle,
  AlertCircle,
  Clock,
  CheckCircle,
  PauseCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Grievance = {
  id: string;
  title: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  status: "New" | "In Progress" | "Under Review" | "Resolved";
  submittedBy: string;
  assignedTo: string;
  date: string;
};

export default function GrievancesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const grievances: Grievance[] = [
    {
      id: "GR-2024-045",
      title: "Wi-Fi Connectivity Issue in Library",
      category: "IT",
      priority: "High",
      status: "New",
      submittedBy: "John Doe",
      assignedTo: "Technical Support",
      date: "2024-05-14",
    },
    {
      id: "GR-2024-043",
      title: "Classroom Projector Malfunction",
      category: "IT",
      priority: "Medium",
      status: "In Progress",
      submittedBy: "Jane Smith",
      assignedTo: "Technical Support",
      date: "2024-05-13",
    },
    {
      id: "GR-2024-040",
      title: "Access Card Not Working",
      category: "Security",
      priority: "Low",
      status: "In Progress",
      submittedBy: "Mike Johnson",
      assignedTo: "Facilities Management",
      date: "2024-05-12",
    },
    {
      id: "GR-2024-039",
      title: "Scholarship Application Issue",
      category: "Administration",
      priority: "Medium",
      status: "Under Review",
      submittedBy: "Sarah Williams",
      assignedTo: "Student Services",
      date: "2024-05-11",
    },
    {
      id: "GR-2024-035",
      title: "Library Book Return System Error",
      category: "IT",
      priority: "Low",
      status: "Resolved",
      submittedBy: "David Brown",
      assignedTo: "Technical Support",
      date: "2024-05-09",
    },
  ];

  const filteredGrievances = grievances.filter((grievance) => {
    if (statusFilter !== "all" && grievance.status !== statusFilter) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        grievance.title.toLowerCase().includes(query) ||
        grievance.id.toLowerCase().includes(query) ||
        grievance.category.toLowerCase().includes(query) ||
        grievance.submittedBy.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "New":
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case "In Progress":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "Under Review":
        return <PauseCircle className="w-4 h-4 text-purple-500" />;
      case "Resolved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusClassName = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "Under Review":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100";
      case "Resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Grievances</h1>
          <p className="text-muted-foreground">
            Manage and track all grievances in the system
          </p>
        </div>
        <Button>
          <MessageCircle className="w-4 h-4 mr-2" />
          Report New Grievance
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Grievances</CardTitle>
          <CardDescription>
            View and manage submitted grievances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center w-full max-w-sm gap-2">
              <div className="relative w-full">
                <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search grievances..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead className="max-w-[300px]">Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrievances.length > 0 ? (
                  filteredGrievances.map((grievance) => (
                    <TableRow key={grievance.id}>
                      <TableCell className="font-medium">
                        {grievance.id}
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">
                        {grievance.title}
                      </TableCell>
                      <TableCell>{grievance.category}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            grievance.priority === "High"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                              : grievance.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          }`}
                        >
                          {grievance.priority}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getStatusIcon(grievance.status)}
                          <span
                            className={`ml-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusClassName(
                              grievance.status
                            )}`}
                          >
                            {grievance.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{grievance.assignedTo}</TableCell>
                      <TableCell>{grievance.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link
                                href={`/dashboard/grievances/${grievance.id}`}
                                className="flex items-center w-full"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Add Comment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Clock className="w-4 h-4 mr-2" />
                              Change Status
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="py-4 text-center">
                      No grievances found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
