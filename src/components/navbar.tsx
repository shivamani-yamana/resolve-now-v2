"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <nav className="border-b bg-background flex justify-between items-center h-16">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <Link href="/" className="font-bold">
          Resolve Now
        </Link>
        <div className="flex items-center gap-4">
          {/* Other navbar items can go here */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
