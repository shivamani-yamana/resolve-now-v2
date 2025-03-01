"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { UserPlus, Search, Filter, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "support",
    status: "active",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "support",
    status: "inactive",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "support",
    status: "active",
  },
];

export default function UsersPage() {
  const { role } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const users = mockUsers; // Changed from const [users, setUsers] = useState(mockUsers);

  // Redirect or show error if not admin
  if (role !== "admin") {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You don&apos;t have permission to access this page.</p>{" "}
            {/* Fixed unescaped entity */}
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-muted-foreground">
            Add, edit, or remove system users
          </p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" /> Add New User
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="border rounded-md">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 font-medium text-left">Name</th>
              <th className="px-4 py-3 font-medium text-left">Email</th>
              <th className="px-4 py-3 font-medium text-left">Role</th>
              <th className="px-4 py-3 font-medium text-left">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-muted/50">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant={user.role === "admin" ? "default" : "outline"}
                  >
                    {user.role}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      user.status === "active" ? "default" : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Reset password</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
