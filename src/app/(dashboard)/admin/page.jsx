"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px] shadow-xl border border-gray-200 dark:border-gray-700 rounded-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              LINKHUB
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your personalized link collection in one place
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button
              onClick={() => router.push("/dashboard")}
              className="transition-transform transform hover:scale-105"
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-transform transform hover:scale-105"
            >
              View My Profile
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page;
