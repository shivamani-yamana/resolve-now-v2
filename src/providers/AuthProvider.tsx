"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "@/hooks/useAuth";

interface AuthContextType {
  user: any;
  role: string | null;
  department: string | null;
  assignedCategories: string[];
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  usersList: any[];
  createUser: (userData: any) => any;
  updateUser: (id: string, userData: any) => void;
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
