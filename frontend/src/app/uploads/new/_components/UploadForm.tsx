"use client";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/fileInput";
import { Loader } from "@/components/ui/loader";
import { parseServerError, showToast } from "@/lib/utils";
import { postUpload } from "@/services/postUpload";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  function handleSelectFile(file: File | null) {
    setError(false);
    setSelectedFile(file);
  }

  async function handleUpload() {
    if (!selectedFile) return;

    setLoading(true);

    try {
      await postUpload(selectedFile);
      router.push("/uploads/success");
    } catch (error) {
      setError(true);
      showToast("error", await parseServerError(error));
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl flex flex-col gap-10">
      <FileInput
        accept=".txt"
        onFileChange={handleSelectFile}
        hasError={error}
        selectedFile={selectedFile}
      />
      <Button
        className="w-full"
        disabled={!selectedFile || loading}
        onClick={handleUpload}
      >
        Enviar
      </Button>
      {loading && <Loader fullscreen />}
    </div>
  );
}
