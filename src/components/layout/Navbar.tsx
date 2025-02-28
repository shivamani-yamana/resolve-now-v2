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
          <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            ResolveNow
          </span>
        </Link>

        <div className="hidden space-x-8 md:flex">
          <Link
            href="#features"
            className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            How it Works
          </Link>

          <Link
            href="#testimonials"
            className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Testimonials
          </Link>
          <Link
            href="/apply-grievance"
            className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Apply Grievance
          </Link>
        </div>

        <div className="items-center hidden space-x-4 md:flex">
          <ThemeToggle />

          <Link
            href="/login"
            className="px-4 py-2 text-white transition-opacity rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
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
        <div className="py-4 mt-4 bg-white shadow-lg md:hidden dark:bg-gray-900 rounded-2xl">
          <div className="flex flex-col px-6 space-y-4">
            <Link
              href="#features"
              className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it Works
            </Link>

            <Link
              href="#testimonials"
              className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="/apply-grievance"
              className="text-gray-700 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Apply Grievance
            </Link>
            <div className="flex flex-col pt-4 space-y-2 border-t dark:border-gray-700">
              <Link
                href="/login"
                className="px-4 py-2 text-center text-blue-600 transition-colors rounded-full dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-center text-white transition-opacity rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
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
