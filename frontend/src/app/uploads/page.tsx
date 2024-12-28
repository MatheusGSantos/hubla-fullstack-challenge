import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoadingPagination, LoadingTable } from "@/components/ui/data-table";
import { Upload } from "lucide-react";
import { Suspense } from "react";
import Content from "./Content";

interface PageProps {
  readonly searchParams: {
    readonly currentPage?: string;
    readonly perPage?: string;
  };
}

export default async function UploadListPage({ searchParams }: PageProps) {
  const currentPage = searchParams.currentPage
    ? parseInt(searchParams.currentPage, 10)
    : 1;
  const perPage = searchParams.perPage
    ? parseInt(searchParams.perPage, 10)
    : 10;

  return (
    <div className="page gap-10">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-medium">Upload History</h1>
        <Button asChild>
          <Link href="/uploads/new">
            <Upload className="w-6 h-6" />
            <span>Upload File</span>
          </Link>
        </Button>
      </header>
      <Suspense
        fallback={
          <>
            <LoadingTable />
            <LoadingPagination />
          </>
        }
      >
        <Content currentPage={currentPage} perPage={perPage} />
      </Suspense>
    </div>
  );
}
