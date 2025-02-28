import React from "react";

import { Layout } from "@/components/layout";

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
}
