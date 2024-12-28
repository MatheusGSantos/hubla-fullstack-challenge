import { DataTable } from "@/components/ui/data-table";
import { fetchUploads } from "@/services/fetchUploads";
import { TABLE_COLUMNS } from "./columns";

interface ContentProps {
  readonly currentPage: number;
  readonly perPage: number;
}

export default async function Content({ currentPage, perPage }: ContentProps) {
  const { data, meta } = await fetchUploads({ currentPage, perPage });

  return (
    <DataTable
      columns={TABLE_COLUMNS}
      data={data}
      pageCount={meta.lastPage}
      currentPage={currentPage - 1} // Zero-based index for react-table
      perPage={perPage}
      usePagination
    />
  );
}
