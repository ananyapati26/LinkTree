"use client";
import { useRouter } from "next/navigation";

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const page = () => {
  const router = useRouter();
  
  return (
    <div>
      <Card className="w-[350px] mt-40">
      <CardHeader>
        <CardTitle>LINKHUB</CardTitle>
        <CardDescription>Your Personalized link collection in one place</CardDescription>
      </CardHeader>
      <CardContent className="gap-4 flex flex-col justify-between align-middle">
        <Button onClick={() => router.push("/dashboard")} >
          Go to Dashboard
        </Button>
        <Button variant="outline">
          View My Profile
        </Button>
      
      </CardContent>
      
    </Card>
    </div>
  )
}

export default page










