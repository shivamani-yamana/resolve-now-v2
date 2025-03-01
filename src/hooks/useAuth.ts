import { useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  username: string;
  role: "admin" | "support";
  department?: string;  // Category/department the support staff belongs to
  team?: string;
  assignedCategories?: string[]; // Categories this support user can handle
};

export function useAuth() {
  // This is a mock implementation. In a real app, you would:
  // 1. Check local storage/cookies for a token
  // 2. Validate the token with your backend
  // 3. Fetch user data if token is valid
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [usersList, setUsersList] = useState<User[]>([]);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock user - this would come from your API
      setUser({
        id: "user-001",
        name: "Jane Doe",
        username: "janedoe",
        role: "admin", // Change to "support" to see the support team dashboard
        department: "IT",
        assignedCategories: ["IT", "Technical Support"]
      });
      
      // Mock user list for admin management
      setUsersList([
        {
          id: "user-001",
          name: "Jane Doe",
          username: "janedoe",
          role: "admin",
        },
        {
          id: "user-002",
          name: "John Smith",
          username: "johnsmith",
          role: "support",
          department: "IT",
          team: "Technical Support",
          assignedCategories: ["IT", "Technical Support"]
        },
        {
          id: "user-003",
          name: "Sarah Lee",
          username: "sarahlee",
          role: "support",
          department: "Administration",
          team: "Academic Affairs",
          assignedCategories: ["Administration", "Academic"]
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);
  
  const login = (username: string, password: string) => {
    // Implementation would call your auth API
    console.log("Login with", username, password);
  };
  
  const logout = () => {
    // Clear user data and token
    setUser(null);
  };
  
  const createUser = (userData: Omit<User, "id">) => {
    // This would make an API call to create the user in a real app
    const newUser = {
      ...userData,
      id: `user-${Math.floor(Math.random() * 1000)}`
    };
    setUsersList([...usersList, newUser]);
    return newUser;
  };
  
  const updateUser = (id: string, userData: Partial<User>) => {
    // Update a user's information
    const updatedUsers = usersList.map(user => 
      user.id === id ? { ...user, ...userData } : user
    );
    setUsersList(updatedUsers);
  };
  
  const deleteUser = (id: string) => {
    // Delete a user
    const filteredUsers = usersList.filter(user => user.id !== id);
    setUsersList(filteredUsers);
  };
  
  return {
    user,
    role: user?.role || null,
    department: user?.department || null,
    assignedCategories: user?.assignedCategories || [],
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    // Admin functions
    usersList,
    createUser,
    updateUser,
    deleteUser
  };
}
