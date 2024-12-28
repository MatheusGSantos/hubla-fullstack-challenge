import { DataTable } from "@/components/ui/data-table";
import { fetchTransactionsByUpload } from "@/services/fetchTransactionsByUpload";
import { TABLE_COLUMNS } from "./columns";

export default async function Content({ id }: Readonly<{ id: string }>) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { transactions, balances } = await fetchTransactionsByUpload({
    uploadId: Number(id),
  });

  return (
    <>
      <h1 className="text-4xl font-medium mt-10 mb-2">Upload #{id}</h1>
      <hr />

      <div className="flex gap-4 my-10">
        <div className="flex-1 border-l-4 border-green-primary pl-2">
          <h3 className="text-lg">Producer Balance</h3>
          <p className="text-2xl">
            $ {(balances.producerBalance / 100).toFixed(2)}
          </p>
        </div>
        <div className="flex-1 border-l-4 border-yellow-primary pl-2">
          <h3 className="text-lg">Affiliates Balance</h3>
          <p className="text-2xl">
            $ {(balances.afiliatesBalance / 100).toFixed(2)}
          </p>
        </div>

        <div className="flex-1 border-l-4 border-purple-primary pl-2">
          <h3 className="text-lg">Total</h3>
          <p className="text-2xl">
            ${" "}
            {(
              (balances.producerBalance + balances.afiliatesBalance) /
              100
            ).toFixed(2)}
          </p>
        </div>
      </div>

      <DataTable columns={TABLE_COLUMNS} data={transactions} />
    </>
  );
}
