import { Layout } from "@/components/layout";

export default function GrievanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <main className="pt-8 pb-16">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg shadow-sm bg-gray-50 dark:bg-stone-950">
            {children}
          </div>
        </div>
      </main>
    </Layout>
  );
}
