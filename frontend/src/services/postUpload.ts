import { api } from "@/lib/api";

export async function postUpload(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return await api
    .post("uploads", {
      body: formData,
    })
    .json();
}
