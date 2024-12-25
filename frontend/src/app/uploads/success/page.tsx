import { CircleCheckBig } from "lucide-react";
import ButtonArea from "./_components/ButtonArea";

export default function UploadSuccess() {
  return (
    <div className="p-8 flex flex-col w-full h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-12">
        <CircleCheckBig size={64} color="#d7ff61" />
        <h1 className="font-medium text-4xl">Seu arquivo foi enviado!</h1>
        <ButtonArea />
      </div>
    </div>
  );
}
