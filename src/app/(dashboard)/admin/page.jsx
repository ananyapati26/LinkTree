import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const page = () => {
  return (
    <div>
      <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>LINKHUB</CardTitle>
        <CardDescription>Your Personalized link collection in one place</CardDescription>
      </CardHeader>
      <CardContent className="gap-4 flex flex-col justify-between align-middle">
        <Button>
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










