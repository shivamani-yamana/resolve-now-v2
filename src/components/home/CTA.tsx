"use client";
import { Button } from "../ui/Button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-stone-950">
      <div className="container px-4 mx-auto">
        <div className="p-12 text-center shadow-xl bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to transform your grievance management?
            </h2>
            <p className="mb-8 text-xl text-blue-100 md:text-2xl">
              Join now by using ResolveNow to streamline complaint resolution
              and improve customer satisfaction.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                className="text-blue-700 bg-white hover:bg-blue-50"
                size="lg"
              >
                <Link href="/login">Start Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
