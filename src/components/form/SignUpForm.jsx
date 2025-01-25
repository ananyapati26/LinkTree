"use client";

import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";
import { useRouter } from "next/navigation";
 
const FormSchema = z.object({
  username:z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required").min(8, "Password must have at least 8 characters"),
  confirmPassword: z.string().min(1, "Password confirmation is required") 
}).refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

const SignUpform = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      })
    })

    if(response.ok) {
      console.log('User created successfully');
      router.push('/sign-in');
    } else {
      console.log('User creation failed response:', response);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-4">
          {" "}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input 
                    type="text"
                  placeholder="johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                            placeholder="mail@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                  placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Re-Enter your Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                  placeholder="Re-Enter your Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          
        </div>

        <Button className="w-full mt-6" type="submit">
          Sign Up
        </Button>
      </form>

      <div className="mx-auto my-4 flex items-center justify-evenly w-full before:mr-4 after:ml-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
      <p className="text-center text-sm text-gray-600 mt-2">
        Already have an account?
        <Link href="/sign-in" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </p>
    </Form>
  );
};

export default SignUpform;
