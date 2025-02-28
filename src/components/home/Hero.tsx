import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resolve Grievances Intelligently
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Our AI-powered platform streamlines complaint management, offering
              faster resolutions and actionable insights for organizations of
              all sizes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Github Link here */}
              <Button size="lg">
                <Link href="https://github.com/shivamani-yamana/resolve-now-v2">
                  Github Link
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                {/* Add demo video link here */}
                <Link href="#demo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Watch Demo
                </Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                  </div>
                ))}
              </div>
              <p className="ml-4 text-sm text-gray-700">
                <span className="font-medium">Organisations</span> trust
                ResolveNow
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl transform rotate-3"></div>
            <div className="relative bg-white p-2 rounded-2xl shadow-xl z-10">
              <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  {/* Image Placeholder here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
