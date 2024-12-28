import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Content from "./Content";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingTable } from "@/components/ui/data-table";

interface UploadDetailsProps {
  readonly params: {
    readonly id: string;
  };
}

function PageLoading() {
  return (
    <>
      <Skeleton className="w-1/4 h-9 mt-10 mb-2" />
      <hr />
      <div className="flex gap-4 my-10">
        <div className="flex-1 border-l-4 border-green-primary pl-2">
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/2 h-9" />
        </div>
        <div className="flex-1 border-l-4 border-yellow-primary pl-2">
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/2 h-9" />
        </div>

        <div className="flex-1 border-l-4 border-purple-primary pl-2">
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/2 h-9" />
        </div>
      </div>

      <LoadingTable />
    </>
  );
}

export default async function UploadDetails({
  params: { id },
}: UploadDetailsProps) {
  return (
    <div className="page">
      <Link className="flex gap-3 items-center" href="/uploads/">
        <ChevronLeft className="w-6 h-6" />
        <span className="text-base">Go back</span>
      </Link>

      <Suspense fallback={<PageLoading />}>
        <Content id={id} />
      </Suspense>
    </div>
  );
}
