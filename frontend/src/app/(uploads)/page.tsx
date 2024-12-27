import { fetchUploads } from "@/services/fetchUploads";

import { TableWithPagination } from "@/components/ui/table-with-pagination";
import { TABLE_COLUMNS } from "./constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <TableWithPagination columns={TABLE_COLUMNS} data={data} meta={meta} />
    </div>
  );
}
