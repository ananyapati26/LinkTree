import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs"; // or "bcrypt" depending on the library you're using

/**
 * @type {import("next-auth").NextAuthOptions}
 */

export const authOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  //to use our custom pages
  pages: {
    signIn: "/sign-in",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
  
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        console.log("Incoming credentials:", credentials);

        if (!credentials?.email || !credentials?.password) {
          // return null;
          throw new Error("Email and Password are required");

        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        console.log(existingUser);    
        if (!existingUser) {
          // return null;
          throw new Error("No user found with this email");
        }
        let passwordMatch = false;

        // Compare passwords if the user's password exists
        if (existingUser.password) {
          passwordMatch = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
        }
      
        // Check if the password matches
        if (!passwordMatch) {
          throw new Error("Invalid password");
        }
        return {
          id: `${existingUser.id}`,
          name: existingUser.username,
          email: existingUser.email, 
        };
      },
    }),
  ],
};
