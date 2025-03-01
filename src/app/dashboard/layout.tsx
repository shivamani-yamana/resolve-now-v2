"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import {
  Home,
  FileText,
  Search,
  LogOut,
  Menu,
  Settings,
  MessageSquare,
  Users,
  BarChart3,
  Layers,
  X,
  UserPlus,
  User,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, role, logout } = useAuth();

  // Close sidebar on path change (for mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Close sidebar when screen resizes to larger than mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const adminNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "All Grievances", href: "/dashboard/grievances", icon: FileText },
    { name: "Teams", href: "/dashboard/teams", icon: Users },
    { name: "Categories", href: "/dashboard/categories", icon: Layers },
    { name: "Users", href: "/dashboard/users", icon: UserPlus },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const supportNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "My Grievances", href: "/dashboard/grievances", icon: FileText },
    { name: "Track Updates", href: "/dashboard/track", icon: Search },
    { name: "Feedback", href: "/dashboard/feedback", icon: MessageSquare },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Help", href: "/dashboard/help", icon: HelpCircle },
  ];

  const navigation = role === "admin" ? adminNavigation : supportNavigation;

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed z-50 lg:hidden top-4 left-4"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu />
      </Button>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile (off-canvas) & Desktop (fixed) */}
      <aside
        className={`fixed top-0 left-0 z-40 w-[280px] sm:w-72 md:w-64 h-screen transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="relative h-full px-3 py-4 overflow-y-auto border-r bg-card">
          {/* Close button - mobile only */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="flex items-center px-2 mb-10">
            <span className="text-xl font-semibold sm:text-2xl">
              Resolve Now
            </span>
          </div>

          <div className="px-2 mb-6">
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">
              {role === "admin" ? "Administrator" : "Support Team Member"}
            </div>
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-2 py-2 rounded-lg hover:bg-accent transition-colors ${
                    isActive ? "bg-accent" : ""
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mr-3 ${isActive ? "text-primary" : ""}`}
                  />
                  <span className={isActive ? "font-medium" : ""}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 border-b bg-card">
          <div className="flex-1 ml-8 lg:ml-0" />
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </header>
        <main className="p-4 mx-auto sm:p-6 max-w-7xl">{children}</main>
      </div>
    </div>
  );
}
