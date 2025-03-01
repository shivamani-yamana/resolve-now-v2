export interface User {
  id?: string;
  email: string;
  name?: string;
  role?: "admin" | "support";
  department?: string;
  assignedCategories?: string[];
  team?: string;
  // Add other known properties here
}

export interface UserCreationData {
  email: string;
  name: string;
  role: "admin" | "support";
  department?: string;
  assignedCategories?: string[];
  team?: string;
  password?: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: "admin" | "support";
  department?: string;
  assignedCategories?: string[];
  team?: string;
}
