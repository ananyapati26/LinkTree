"use client"; // This component is a client component, so it can use hooks like useSession
import Link from "next/link";
import { useSession } from "next-auth/react";


export default function Home() {
    const { data: session } = useSession(); // Get the authenticated user session
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black font-sans">
      {/* Hero Section */}
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-5xl font-bold tracking-wide text-black">
          Professional Link Management
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Organize and share your links efficiently.
        </p>
        <Link
          href={session ? "/admin" : "/sign-in"}
          className="mt-6 inline-block bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded transition shadow-md"
        >
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-4xl">
        <div className="p-6 rounded-lg border border-gray-400 text-center bg-gray-100 shadow-lg">
          <h3 className="text-lg font-semibold text-black">Centralized Links</h3>
          <p className="mt-2 text-gray-700">Keep all your links in one place.</p>
        </div>
        <div className="p-6 rounded-lg border border-gray-400 text-center bg-gray-100 shadow-lg">
          <h3 className="text-lg font-semibold text-black">Customizable Layout</h3>
          <p className="mt-2 text-gray-700">Adapt the design to your brand.</p>
        </div>
        <div className="p-6 rounded-lg border border-gray-400 text-center bg-gray-100 shadow-lg">
          <h3 className="text-lg font-semibold text-black">Analytics & Insights</h3>
          <p className="mt-2 text-gray-700">Track engagement and performance.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-gray-700 text-sm">
        <p>© {new Date().getFullYear()} Professional Links. All rights reserved.</p>
      </footer>
    </main>
  );
}
