"use client";

import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="page items-center justify-center gap-10">
      <CircleHelp size={64} className="text-yellow-primary" />
      <h1 className="text-4xl max-w-96 text-center">404 Not Found</h1>
      <div className="flex gap-4">
        <Button variant={"outline"} onClick={() => router.back()}>
          Go back
        </Button>
        <Button onClick={() => router.push("/uploads")}>Go to Uploads</Button>
      </div>
    </div>
  );
}
