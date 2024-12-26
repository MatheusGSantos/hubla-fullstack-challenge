import { Prisma } from "@prisma/client";

export class Transaction implements Prisma.TransactionUncheckedCreateInput {
  id?: number;
  type: number;
  timestamp: string | Date;
  value: number;
  seller: string;
  uploadId: number;
  amount: number;
  description: string;
  createdAt?: string | Date;
}
