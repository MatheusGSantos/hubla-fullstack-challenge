import { fetchUploads } from "@/services/fetchUploads";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { TABLE_COLUMNS } from "./columns";

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

  const { data, meta } = await fetchUploads({ currentPage, perPage });

  return (
    <div className="page gap-8">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-medium">Uploads</h1>
        <Button asChild>
          <Link href="/uploads/new">Novo Upload</Link>
        </Button>
      </header>
      <DataTable
        columns={TABLE_COLUMNS}
        data={data}
        pageCount={meta.lastPage}
        currentPage={currentPage - 1} // Zero-based index for react-table
        perPage={perPage}
      />
    </div>
  );
}
