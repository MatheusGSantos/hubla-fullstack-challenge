"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { parseServerError, showToast } from "@/lib/utils";
import { postLogin } from "@/services/postLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("This field is required"),
  password: yup.string().required("This field is required"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      await postLogin(data);
      router.push("/uploads");
    } catch (error) {
      const message = await parseServerError(error);
      setLoading(false);
      showToast("error", message);
    }
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
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input
              type="email"
              placeholder="Email"
              autoComplete="one-time-code"
              {...register("email")}
            />
            <p className="text-xs font-normal text-red-200">
              {errors?.email?.message ?? " "}
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="password" className="mb-2">
              Password
            </Label>
            <Input
              type="password"
              autoComplete="one-time-code"
              placeholder="Password"
              {...register("password")}
            />
            <p className="text-xs font-normal text-red-200 mb-2">
              {errors?.password?.message ?? " "}
            </p>
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
      {loading && <Loader fullscreen />}
    </div>
  );
}
