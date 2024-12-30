"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/utils";
import { ServerCrash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PageError() {
  const router = useRouter();
  return (
    <div className="page items-center justify-center gap-10">
      <ServerCrash size={64} className="text-red-primary" />
      <h1 className="text-4xl max-w-96 text-center">{DEFAULT_ERROR_MESSAGE}</h1>
      <div className="flex gap-4">
        <Button variant={"outline"} onClick={() => router.back()}>
          Go back
        </Button>
        <Button onClick={() => router.push("/uploads")}>Go to Uploads</Button>
      </div>
    </div>
  );
}
