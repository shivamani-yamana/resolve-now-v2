"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GrievanceSubmittedPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Separate redirect action from countdown logic
  useEffect(() => {
    if (shouldRedirect) {
      router.push("/");
    }
  }, [shouldRedirect, router]);

  // Handle countdown separately
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShouldRedirect(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen px-4 pt-4 bg-gray-50 dark:bg-stone-950">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md dark:bg-gray-900/80">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Grievance Submitted!
        </h2>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Thank you for submitting your grievance. Our team will review it and
          take appropriate action.
        </p>

        <div className="p-4 mt-4 text-left text-gray-700 border border-yellow-200 rounded-md bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-900 dark:text-gray-300">
          <p className="mb-2 font-medium">What happens next?</p>
          <ul className="pl-5 space-y-1 text-sm list-disc">
            <li>
              A short SMS message with your ticket ID and details will be sent
              to your registered phone number.
            </li>
            <li>
              You can use this ticket ID to track the status of your grievance.
            </li>
            <li>Our team will process your request promptly.</li>
          </ul>
          <p className="mt-2 text-sm italic">
            Thank you for helping us streamline the processing of your
            grievance.
          </p>
        </div>

        <div className="p-3 mt-6 text-sm text-blue-800 bg-blue-100 rounded-md dark:bg-blue-900/30 dark:text-blue-300">
          Redirecting to home page in{" "}
          <span className="font-bold">{countdown}</span> seconds...
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
