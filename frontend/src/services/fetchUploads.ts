import { Meta } from "@/interfaces/Meta";
import { Upload } from "@/interfaces/Upload";
import { api } from "@/lib/api";

interface FetchUploadsConfig {
  currentPage?: number;
  perPage?: number;
}

interface Response {
  data: Array<Upload>;
  meta: Meta;
}

export function fetchUploads({
  currentPage = 1,
  perPage = 10,
}: FetchUploadsConfig): Promise<Response> {
  return api
    .get("uploads", {
      searchParams: {
        page: currentPage,
        perPage: perPage,
      },
      cache: "no-cache",
    })
    .json();
}
