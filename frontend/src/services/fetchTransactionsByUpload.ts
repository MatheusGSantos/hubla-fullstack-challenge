import { Transaction } from "@/interfaces/Transaction";
import { api } from "@/lib/api";

interface FetchTransctionsByUploadIdConfig {
  currentPage?: number;
  perPage?: number;
  uploadId: number;
}

interface Response {
  transactions: Array<Transaction>;
  balances: {
    producerBalance: number;
    afiliatesBalance: number;
  };
}

export function fetchTransactionsByUpload({
  uploadId,
}: FetchTransctionsByUploadIdConfig): Promise<Response> {
  return api
    .get("transactions", {
      searchParams: {
        uploadId,
      },
      cache: "no-cache",
    })
    .json();
}
