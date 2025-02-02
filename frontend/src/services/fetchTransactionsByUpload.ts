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

export async function fetchTransactionsByUpload({
  uploadId,
}: FetchTransctionsByUploadIdConfig): Promise<Response> {
  return await api
    .get(`uploads/${uploadId}/transactions`, {
      cache: "no-cache",
    })
    .json();
}
