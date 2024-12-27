import { DataTable } from "@/components/ui/data-table";
import { fetchTransactionsByUpload } from "@/services/fetchTransactionsByUpload";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { TABLE_COLUMNS } from "./columns";

interface UploadDetailsProps {
  readonly params: {
    readonly id: string;
  };
}

export default async function UploadDetails({
  params: { id },
}: UploadDetailsProps) {
  const { data } = await fetchTransactionsByUpload({ uploadId: Number(id) });

  return (
    <div className="page">
      <Link className="flex gap-3 items-center" href="/uploads/">
        <ChevronLeft className="w-6 h-6" />
        <span className="text-base">Go back</span>
      </Link>
      <h1 className="text-4xl font-medium mt-10 mb-2">Upload #{id}</h1>
      <hr />
      <h2 className="text-2xl mt-5 mb-4">Transactions</h2>
      <DataTable columns={TABLE_COLUMNS} data={data} />
    </div>
  );
}
