import { Prisma } from "@prisma/client";

export class Upload implements Prisma.UploadUncheckedCreateInput {
  id?: number;
  filename: string;
  createdAt?: string | Date;
}
