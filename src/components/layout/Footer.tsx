import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 bg-gray-50 dark:bg-stone-950">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                ResolveNow
              </span>
            </Link>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              The advanced AI-powered platform streamlining grievance management
              for organizations worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors bg-gray-200 rounded-full dark:bg-stone-800 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Features
                </Link>
              </li>

              <li>
                <Link
                  href="#how-it-works"
                  className="text-gray-600 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-gray-600 transition-colors dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-stone-800">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 md:mb-0">
              &copy; {new Date().getFullYear()} ResolveNow. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/terms"
                className="text-sm text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/security"
                className="text-sm text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
