"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { HandMetal } from "lucide-react";
// import { useSession, signOut } from "next-auth/react";
import useDarkModeStore from "@/store/useDarkModeStore";

const Navbar = () => {
  const { data: session } = useSession(); // Get the authenticated user session
  const { darkMode, setDarkMode } = useDarkModeStore(); // Get the dark mode state and setter function from Zustand store
  return (
    <div
      className={`${
        darkMode ? "bg-zinc-700" : "bg-zinc-300"
      } py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0 `}
    >
      <div className="container flex items-center justify-between">
        <Link href={session ? "/admin" : "/"}>
          <HandMetal
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-black"
            }`}
          />
        </Link>

        {/* 
        // Show sign-in button if user is not logged in i.e always show sign in button

        <Link className={buttonVariants()} href="/sign-in">
          Sign in
        </Link> 
        */}

        {session ? (
          // Show profile or logout button if user is signed in only

          //Using async/await ensures that signOut() completes before redirecting the user to /.

          // Why async/await?
          // Ensures sign-out completes first:
          // signOut() is an asynchronous function. If you don’t await it, the redirection (window.location.href = "/") might happen before the sign-out process is fully completed.
          // This could cause issues like the session still appearing active after redirecting.
          // Prevents race conditions:
          // Without await, window.location.href = "/" might execute before the authentication state updates, leading to unexpected behavior.
          <button
            onClick={async () => {
              await signOut();
              window.location.href = "/";
            }}
            className={buttonVariants({ variant: "outline" })}
          >
            Logout
          </button>
        ) : (
          // Show sign-in button if user is not logged in
          <Link className={buttonVariants()} href="/sign-in">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

// useSession() is a React Hook provided by NextAuth.js.
// It retrieves session data (like user details, authentication status) using React Context.
// React Context requires a Provider to store and manage the session data.
