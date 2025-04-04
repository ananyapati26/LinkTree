import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LinkHub",
  description: "Store your links in one place",
};
//items-center justify-center h-screen
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <main className="flex flex-col">
        <Navbar />
        {children}
        </main>
        
      </body>
      </SessionWrapper>
    </html>
  );
}


//If you call useSession() without wrapping your app in <SessionProvider>, React doesn’t know where to get the session data from.
//Session is used in navbar to check if user is logged in or not.
//If user is logged in, then show logout button, else show sign in button.
