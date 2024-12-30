"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface FormPayload {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<FormPayload>();

  const onSubmit = (data: FormPayload) => {
    console.log(data);
  };

  return (
    <div className="page items-center justify-center">
      <div className="flex flex-col min-w-96 justify-center bg-gray-medium py-6 px-6 gap-4">
        <h1 className="text-3xl font-medium">Login</h1>
        <p className="text-sm font-medium text-gray-lighter">
          Welcome back! Login to your account to continue.
        </p>
        <form
          className="flex flex-col items-center justify-center gap-6 w-full my-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              autoComplete="one-time-code"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              autoComplete="one-time-code"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p className="text-sm text-center">
          {"Don't have an account?"}{" "}
          <Link
            className="text-green-primary cursor-pointer hover:text-green-primary/70 transition-colors"
            href="/signup"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
