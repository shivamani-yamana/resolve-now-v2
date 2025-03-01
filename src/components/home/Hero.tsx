import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center md:flex-row">
          <div className="w-full mb-12 md:w-1/2 md:mb-0 md:pr-8">
            <h1 className="mb-6 text-4xl font-bold text-transparent md:text-5xl lg:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Resolve Grievances Intelligently
            </h1>
            <p className="mb-8 text-lg text-gray-700 dark:text-gray-400 md:text-xl">
              Our AI-powered platform streamlines complaint management, offering
              faster resolutions and actionable insights for organizations of
              all sizes.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Github Link here */}
              <Button size="lg">
                <Link href="https://github.com/shivamani-yamana/resolve-now-v2">
                  Github Link
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                {/* Add demo video link here */}
                <Link
                  href="https://youtu.be/MrWB3SiP7qg"
                  className="flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
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
            <div className="flex items-center mt-10">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 overflow-hidden bg-gray-200 border-2 border-white rounded-full dark:bg-gray-900/80"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                  </div>
                ))}
              </div>
              <p className="ml-4 text-sm text-gray-700 dark:text-gray-400">
                <span className="font-medium">Organisations</span> trust
                ResolveNow
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-0 transform bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl rotate-3"></div>
            <div className="relative z-10 p-2 bg-white shadow-xl rounded-2xl">
              <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <Image
                    src="/project-demo.png"
                    alt="Hero"
                    layout="fill"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
