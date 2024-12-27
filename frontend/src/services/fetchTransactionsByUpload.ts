import { Meta } from "@/interfaces/Meta";
import { Transaction } from "@/interfaces/Transaction";
import { api } from "@/lib/api";

interface FetchTransctionsByUploadIdConfig {
  currentPage?: number;
  perPage?: number;
  uploadId: number;
}

interface Response {
  data: Array<Transaction>;
  meta: Meta;
}

export function fetchTransactionsByUpload({
  currentPage = 1,
  perPage = 9999,
  uploadId,
}: FetchTransctionsByUploadIdConfig): Promise<Response> {
  return api
    .get("transactions", {
      searchParams: {
        page: currentPage,
        perPage: perPage,
        uploadId,
      },
      cache: "no-cache",
    })
    .json();
}
