import React from "react";
import { Navbar } from "@/components/navbar";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <div className="flex  items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">{children}</div>
        </div>
      </div>
    </>
  );
}
