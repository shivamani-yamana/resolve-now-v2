"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
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
  MoreHorizontal,
  Eye,
  MessageCircle,
  AlertCircle,
  Clock,
  CheckCircle,
  PauseCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
  const { role, department, assignedCategories } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string }>(
    {}
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGrievance, setNewGrievance] = useState({
    title: "",
    description: "",
    category: "IT",
    priority: "Medium",
  });

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

  // Filter grievances based on user role and department
  const filteredByRoleGrievances =
    role === "admin"
      ? grievances // Admins see all grievances
      : grievances.filter(
          (grievance) => assignedCategories.includes(grievance.category) // Support staff only see their department's grievances
        );

  // Extract unique categories and priorities for filter options
  const categories = ["all", ...new Set(grievances.map((g) => g.category))];
  const priorities = ["all", ...new Set(grievances.map((g) => g.priority))];
  const statuses = ["all", "New", "In Progress", "Under Review", "Resolved"];

  const applyFilter = (type: string, value: string) => {
    switch (type) {
      case "status":
        setStatusFilter(value);
        break;
      case "category":
        setCategoryFilter(value);
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
    setCategoryFilter("all");
    setPriorityFilter("all");
    setActiveFilters({});
  };

  const filteredGrievances = filteredByRoleGrievances.filter((grievance) => {
    // Filter by status
    if (statusFilter !== "all" && grievance.status !== statusFilter) {
      return false;
    }

    // Filter by category
    if (categoryFilter !== "all" && grievance.category !== categoryFilter) {
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

  const handleSubmitGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to submit the grievance
    console.log("Submitting grievance:", newGrievance);

    // Generate a new random ID and create the grievance object
    const now = new Date();
    const newId = `GR-${now.getFullYear()}-${String(
      Math.floor(Math.random() * 1000)
    ).padStart(3, "0")}`;

    const submittedGrievance = {
      id: newId,
      title: newGrievance.title,
      category: newGrievance.category,
      priority: newGrievance.priority as "Low" | "Medium" | "High",
      status: "New",
      submittedBy: "Current User", // In a real app, this would come from auth context
      assignedTo: "Pending Assignment",
      date: now.toISOString().split("T")[0],
    };

    console.log("Submitted Grievamce", submittedGrievance);
    // In a real app, you would add this to your state after API confirmation
    // For this demo, we'll show a success message

    toast.success("Grievance submitted successfully");

    // Reset form and close dialog
    setNewGrievance({
      title: "",
      description: "",
      category: "IT",
      priority: "Medium",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {role === "admin" ? "All Grievances" : "My Department Grievances"}
          </h1>
          <p className="text-muted-foreground">
            {role === "admin"
              ? "Manage and track all grievances in the system"
              : `Manage grievances in the ${department} department`}
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <MessageCircle className="w-4 h-4 mr-2" />
          Report New Grievance
        </Button>
      </div>

      {/* New Grievance Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleSubmitGrievance}>
            <DialogHeader>
              <DialogTitle>Report a New Grievance</DialogTitle>
              <DialogDescription>
                Fill out the form below to submit a new grievance. You will be
                notified when there is an update.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newGrievance.title}
                  onChange={(e) =>
                    setNewGrievance({ ...newGrievance, title: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="Brief title of your grievance"
                  required
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={newGrievance.category}
                  onValueChange={(value) =>
                    setNewGrievance({ ...newGrievance, category: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Administration">
                      Administration
                    </SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Facilities">Facilities</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select
                  value={newGrievance.priority}
                  onValueChange={(value) =>
                    setNewGrievance({ ...newGrievance, priority: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid items-start grid-cols-4 gap-4">
                <Label htmlFor="description" className="pt-2 text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newGrievance.description}
                  onChange={(e) =>
                    setNewGrievance({
                      ...newGrievance,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                  placeholder="Detailed description of your grievance"
                  rows={5}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Grievance</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
              <Select
                value={statusFilter}
                onValueChange={(value) => applyFilter("status", value)}
              >
                <SelectTrigger className="w-[150px]">
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
                value={categoryFilter}
                onValueChange={(value) => applyFilter("category", value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={priorityFilter}
                onValueChange={(value) => applyFilter("priority", value)}
              >
                <SelectTrigger className="w-[150px]">
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
          </div>

          {/* Active filters display */}
          {Object.keys(activeFilters).length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
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
              {Object.keys(activeFilters).length > 1 && (
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
