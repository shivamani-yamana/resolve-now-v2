import Navbar from "@/components/layout/Navbar";
import React from "react";

export default function TrackGrievanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative flex items-center justify-center w-full">
        <Navbar className="top-2" />
      </div>
      <main className="bg-gray-50">
        <div className="px-4 py-8 mx-auto mt-12 max-w-7xl sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </>
  );
}
