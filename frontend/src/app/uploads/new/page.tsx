import { UploadForm } from "./_components/UploadForm";

export default function NewUpload() {
  return (
    <div className="p-8 flex flex-col w-full h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-20">
        <h1 className="font-medium text-4xl">
          Fazer upload de arquivo de transação
        </h1>
        <UploadForm />
      </div>
    </div>
  );
}
