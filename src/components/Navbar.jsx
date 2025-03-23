"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { HandMetal } from "lucide-react";
// import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession(); // Get the authenticated user session
  return (
    <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <HandMetal />
        </Link>

        {/* 
        // Show sign-in button if user is not logged in i.e always show sign in button

        <Link className={buttonVariants()} href="/sign-in">
          Sign in
        </Link> 
        */} 

        {session ? (
          // Show profile or logout button if user is signed in only
          <button
            onClick={() => signOut()}
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