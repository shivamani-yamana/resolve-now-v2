"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className={cn(
        "fixed z-50 w-full max-w-7xl px-6 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ResolveNow
          </span>
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link
            href="#features"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            How it Works
          </Link>

          <Link
            href="#testimonials"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Testimonials
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="px-4 py-2 rounded-full text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 py-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
          <div className="flex flex-col space-y-4 px-6">
            <Link
              href="#features"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it Works
            </Link>

            <Link
              href="#testimonials"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t dark:border-gray-700">
              <Link
                href="/login"
                className="px-4 py-2 rounded-full text-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-center text-white hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
