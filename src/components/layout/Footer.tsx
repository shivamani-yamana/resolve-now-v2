import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ResolveNow
              </span>
            </Link>
            <p className="text-gray-600 mb-6">
              The advanced AI-powered platform streamlining grievance management
              for organizations worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Features
                </Link>
              </li>

              <li>
                <Link
                  href="#how-it-works"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ResolveNow. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/security"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
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
