"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ButtonArea() {
  const router = useRouter();

  return (
    <div className="flex gap-4">
      <Button variant={"outline"} onClick={() => router.push("/uploads/new")}>
        Novo Upload
      </Button>
      <Button onClick={() => router.push("/transactions")}>
        Ver transações
      </Button>
    </div>
  );
}
