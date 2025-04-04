import DashboardTabs from "@/components/dashboard/tabs";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


export default function DashboardPage() {
  const router = useRouter();
    const { data: session, status } = useSession();
  
    // Check authentication
    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/sign-in");
      }
    }, [status, router]);


    if (status === "loading") {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse delay-150"></div>
            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      );
    }

    
  return (
    <div>
      <DashboardTabs />
    </div>
  );
}
