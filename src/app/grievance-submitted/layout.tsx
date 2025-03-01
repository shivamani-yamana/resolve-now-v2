import React from "react";

import { Layout } from "@/components/layout";

interface GrievanceSubmittedLayoutProps {
  children: React.ReactNode;
}

export default function GrievanceSubmittedLayout({
  children,
}: GrievanceSubmittedLayoutProps) {
  return (
    <>
      <Layout>{children}</Layout>
    </>
  );
}
