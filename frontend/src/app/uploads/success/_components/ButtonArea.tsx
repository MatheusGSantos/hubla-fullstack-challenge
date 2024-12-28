"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ButtonArea() {
  const router = useRouter();

  return (
    <div className="flex gap-4">
      <Button variant={"outline"} onClick={() => router.push("/uploads/new")}>
        New Upload
      </Button>
      <Button onClick={() => router.push("/uploads")}>See Uploads</Button>
    </div>
  );
}
