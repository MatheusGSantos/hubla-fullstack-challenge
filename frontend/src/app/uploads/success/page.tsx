import { CircleCheckBig } from "lucide-react";
import ButtonArea from "./_components/ButtonArea";

export default function UploadSuccess() {
  return (
    <div className="page items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-12">
        <CircleCheckBig size={64} color="#d7ff61" />
        <h1 className="font-medium text-4xl">All went flawlessly!</h1>
        <ButtonArea />
      </div>
    </div>
  );
}
