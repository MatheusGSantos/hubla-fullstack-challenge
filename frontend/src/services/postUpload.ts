import { api } from "@/lib/api";

export function postUpload(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return api
    .post("uploads", {
      body: formData,
    })
    .json();
}
