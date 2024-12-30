import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!isAuthenticated()) {
    // redirect just in server side
    redirect("/login");
  }

  return children;
}
