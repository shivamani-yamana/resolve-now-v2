"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative p-2 transition-colors bg-transparent rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Moon className="absolute w-5 h-5 text-gray-300 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
        <Sun className="absolute w-5 h-5 text-gray-700 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
