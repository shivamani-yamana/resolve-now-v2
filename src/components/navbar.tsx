"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="fixed z-50 w-full bg-white dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16 px-6 mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            Resolve Now
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/apply-grievance"
            className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Apply Grievance
          </Link>
          <ThemeToggle />
          <Link
            href="/login"
            className="px-4 py-2 text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
