import React from "react";

import { Layout } from "@/components/layout";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
      <div className="min-h-screen">
        <Layout>
          <div className="flex items-center justify-center px-4 py-12 bg-white dark:bg-stone-950 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">{children}</div>
          </div>
        </Layout>
      </div>
    </>
  );
}
