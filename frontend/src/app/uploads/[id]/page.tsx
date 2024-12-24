interface UploadDetailsProps {
  readonly params: {
    readonly id: string;
  };
}

export default async function UploadDetails({
  params: { id },
}: UploadDetailsProps) {
  return (
    <div>
      <h1>Upload Details {id}</h1>
    </div>
  );
}
