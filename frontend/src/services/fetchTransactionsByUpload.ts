import { Transaction } from "@/interfaces/Transaction";
import { api } from "@/lib/api";

interface FetchTransctionsByUploadIdConfig {
  currentPage?: number;
  perPage?: number;
  uploadId: number;
  jwt?: string;
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
  jwt,
}: FetchTransctionsByUploadIdConfig): Promise<Response> {
  return await api
    .get(`uploads/${uploadId}/transactions`, {
      headers: {
        Cookie: `jwt=${jwt}`,
      },
      cache: "no-cache",
    })
    .json();
}
