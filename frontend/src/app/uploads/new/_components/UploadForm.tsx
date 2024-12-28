"use client";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/fileInput";
import { Loader } from "@/components/ui/loader";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/utils";
import { postUpload } from "@/services/postUpload";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  function handleSelectFile(file: File | null) {
    setError(false);
    setSelectedFile(file);
  }

  function handleUpload() {
    if (!selectedFile) return;

    setLoading(true);

    postUpload(selectedFile)
      .then(() => {
        router.push("/uploads/success");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
        toast.error(DEFAULT_ERROR_MESSAGE);
      });
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
