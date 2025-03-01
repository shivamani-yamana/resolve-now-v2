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

import { Plus, Pencil, Trash2, Tag } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Category = {
  id: string;
  name: string;
  description: string;
  count: number;
  assignedTeam: string;
  createdAt: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "cat-1",
      name: "IT",
      description: "All information technology related issues",
      count: 24,
      assignedTeam: "Technical Support",
      createdAt: "2024-01-05",
    },
    {
      id: "cat-2",
      name: "Education",
      description: "Academic and educational related issues",
      count: 17,
      assignedTeam: "Academic Affairs",
      createdAt: "2024-01-05",
    },
    {
      id: "cat-3",
      name: "Infrastructure",
      description: "Physical infrastructure and facility issues",
      count: 9,
      assignedTeam: "Facilities Management",
      createdAt: "2024-01-06",
    },
    {
      id: "cat-4",
      name: "Administration",
      description: "Administrative processes and services",
      count: 15,
      assignedTeam: "Student Services",
      createdAt: "2024-01-07",
    },
    {
      id: "cat-5",
      name: "Finance",
      description: "Financial concerns and payment issues",
      count: 11,
      assignedTeam: "Finance Department",
      createdAt: "2024-01-10",
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    assignedTeam: "",
  });

  const handleCreateCategory = () => {
    if (
      !newCategory.name ||
      !newCategory.description ||
      !newCategory.assignedTeam
    ) {
      toast.error("Please fill out all required fields");
      return;
    }

    const category: Category = {
      id: `cat-${categories.length + 1}`,
      name: newCategory.name,
      description: newCategory.description,
      count: 0,
      assignedTeam: newCategory.assignedTeam,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setCategories([...categories, category]);
    setNewCategory({
      name: "",
      description: "",
      assignedTeam: "",
    });
    setIsCreateDialogOpen(false);
    toast.success(`Category "${category.name}" created successfully`);
  };

  const handleEditCategory = () => {
    if (!selectedCategory) return;

    const updatedCategories = categories.map((category) =>
      category.id === selectedCategory.id ? selectedCategory : category
    );

    setCategories(updatedCategories);
    setIsEditDialogOpen(false);
    toast.success(`Category "${selectedCategory.name}" updated successfully`);
  };

  const handleDeleteCategory = (id: string) => {
    const categoryToDelete = categories.find((cat) => cat.id === id);

    if (
      confirm(
        `Are you sure you want to delete the category "${categoryToDelete?.name}"?`
      )
    ) {
      const updatedCategories = categories.filter(
        (category) => category.id !== id
      );
      setCategories(updatedCategories);
      toast.success(`Category deleted successfully`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Grievance Categories</h1>
          <p className="text-muted-foreground">
            Manage categories for grievance classification
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>
            A list of all categories for classifying grievances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Assigned Team</TableHead>
                <TableHead>Grievances</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
                      {category.name}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {category.description}
                  </TableCell>
                  <TableCell>{category.assignedTeam}</TableCell>
                  <TableCell>{category.count}</TableCell>
                  <TableCell>{category.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
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

      {/* Create Category Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Add a new category for classifying grievances
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid items-start grid-cols-4 gap-4">
              <Label htmlFor="description" className="pt-2 text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="team" className="text-right">
                Assigned Team
              </Label>
              <Input
                id="team"
                value={newCategory.assignedTeam}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    assignedTeam: e.target.value,
                  })
                }
                className="col-span-3"
                placeholder="Team that handles this category"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateCategory}>Create Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update category information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={selectedCategory?.name || ""}
                onChange={(e) =>
                  setSelectedCategory(
                    selectedCategory
                      ? { ...selectedCategory, name: e.target.value }
                      : null
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid items-start grid-cols-4 gap-4">
              <Label htmlFor="edit-description" className="pt-2 text-right">
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={selectedCategory?.description || ""}
                onChange={(e) =>
                  setSelectedCategory(
                    selectedCategory
                      ? { ...selectedCategory, description: e.target.value }
                      : null
                  )
                }
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="edit-team" className="text-right">
                Assigned Team
              </Label>
              <Input
                id="edit-team"
                value={selectedCategory?.assignedTeam || ""}
                onChange={(e) =>
                  setSelectedCategory(
                    selectedCategory
                      ? { ...selectedCategory, assignedTeam: e.target.value }
                      : null
                  )
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
