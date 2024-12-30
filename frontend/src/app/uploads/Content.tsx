import { DataTable } from "@/components/ui/data-table";
import { fetchUploads } from "@/services/fetchUploads";
import { TABLE_COLUMNS } from "./columns";
import { cookies } from "next/headers";

interface ContentProps {
  readonly currentPage: number;
  readonly perPage: number;
}

export default async function Content({ currentPage, perPage }: ContentProps) {
  const cookieStore = cookies();

  const jwt = cookieStore.get("jwt")?.value;
  if (!jwt) {
    throw new Error("Unauthorized: JWT token is missing");
  }

  const { data, meta } = await fetchUploads({ currentPage, perPage, jwt });

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
