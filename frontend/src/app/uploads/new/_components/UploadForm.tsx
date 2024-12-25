"use client";
import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/fileInput";
import { Loader } from "@/components/ui/loader";
import { useState } from "react";

export function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full max-w-xl flex flex-col gap-10">
      <FileInput
        accept=".txt"
        onFileChange={setSelectedFile}
        selectedFile={selectedFile}
      />
      <Button
        className="w-full"
        disabled={!selectedFile || loading}
        onClick={() => setLoading(true)}
      >
        Enviar
      </Button>
      {loading && <Loader fullscreen />}
    </div>
  );
}
