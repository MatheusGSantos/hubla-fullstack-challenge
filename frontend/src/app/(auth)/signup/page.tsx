"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

interface FormPayload {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const { register, handleSubmit } = useForm<FormPayload>();

  const onSubmit = (data: FormPayload) => {
    console.log(data);
  };

  return (
    <div className="page items-center justify-center">
      <div className="flex flex-col min-w-96 justify-center bg-gray-medium py-6 px-6 gap-4">
        <h1 className="text-3xl font-medium">Sign Up</h1>
        <p className="text-sm font-medium text-gray-lighter">
          Create an account to continue.
        </p>
        <form
          className="flex flex-col items-center justify-center gap-6 w-full my-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="email">Name</Label>
            <Input
              placeholder="Name"
              autoComplete="one-time-code"
              {...register("name")}
            />
          </div>
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
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}
