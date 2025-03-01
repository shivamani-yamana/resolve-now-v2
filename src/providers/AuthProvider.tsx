"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { User, UserCreationData, UserResponse } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  role: "admin" | "support" | null;
  department: string | null;
  assignedCategories: string[];
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  usersList: User[];
  createUser: (userData: UserCreationData) => UserResponse;
  updateUser: (id: string, userData: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
