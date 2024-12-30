import { Meta } from "@/interfaces/Meta";
import { Upload } from "@/interfaces/Upload";
import { api } from "@/lib/api";

interface FetchUploadsConfig {
  currentPage?: number;
  perPage?: number;
  jwt?: string;
}

interface Response {
  data: Array<Upload>;
  meta: Meta;
}

export async function fetchUploads({
  currentPage = 1,
  perPage = 10,
  jwt,
}: FetchUploadsConfig): Promise<Response> {
  return await api
    .get("uploads", {
      searchParams: {
        page: currentPage,
        perPage: perPage,
      },
      headers: {
        Cookie: `jwt=${jwt}`,
      },
      cache: "no-cache",
    })
    .json();
}
