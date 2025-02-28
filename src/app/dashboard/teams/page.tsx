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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Plus, Pencil, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Team = {
  id: string;
  name: string;
  category: string;
  members: number;
  lead: string;
  status: "Active" | "Inactive";
};

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "team-1",
      name: "Technical Support",
      category: "IT",
      members: 5,
      lead: "John Smith",
      status: "Active",
    },
    {
      id: "team-2",
      name: "Academic Affairs",
      category: "Education",
      members: 4,
      lead: "Maria Rodriguez",
      status: "Active",
    },
    {
      id: "team-3",
      name: "Facilities Management",
      category: "Infrastructure",
      members: 6,
      lead: "David Johnson",
      status: "Active",
    },
    {
      id: "team-4",
      name: "Student Services",
      category: "Administration",
      members: 3,
      lead: "Sarah Chen",
      status: "Inactive",
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: "",
    category: "",
    lead: "",
  });

  const handleCreateTeam = () => {
    const team: Team = {
      id: `team-${teams.length + 1}`,
      name: newTeam.name,
      category: newTeam.category,
      members: 1,
      lead: newTeam.lead,
      status: "Active",
    };
    
    setTeams([...teams, team]);
    setIsCreateDialogOpen(false);
    setNewTeam({ name: "", category: "", lead: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Support Teams</h1>
          <p className="text-muted-foreground">
            Manage your grievance support teams
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Team
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Teams</CardTitle>
          <CardDescription>
            A list of all support teams in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Team Lead</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell>{team.category}</TableCell>
                  <TableCell>{team.lead}</TableCell>
                  <TableCell>{team.members}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        team.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                      }`}
                    >
                      {team.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/dashboard/teams/${team.id}`}>
                        <Button variant="ghost" size="icon">
                          <Users className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Support Team</DialogTitle>
            <DialogDescription>
              Add a new team to handle specific types of grievances
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Team Name
              </Label>
              <Input
                id="name"
                value={newTeam.name}
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select 
                onValueChange={(value) => setNewTeam({ ...newTeam, category: value })}
                value={newTeam.category}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lead" className="text-right">
                Team Lead
              </Label>
              <Input
                id="lead"
                value={newTeam.lead}
                onChange={(e) => setNewTeam({ ...newTeam, lead: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTeam}>Create Team</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}