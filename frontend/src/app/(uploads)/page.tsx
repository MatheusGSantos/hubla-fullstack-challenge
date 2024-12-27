import { fetchUploads } from "@/services/fetchUploads";

import { TableWithPagination } from "@/components/ui/table-with-pagination";
import { TABLE_COLUMNS } from "./constants";

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
    <div className="page">
      <TableWithPagination columns={TABLE_COLUMNS} data={data} meta={meta} />
    </div>
  );
}
