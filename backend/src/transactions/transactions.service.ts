import { Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { createPaginator } from "prisma-pagination";
import { ReadTransactionDto } from "./dto/read-transaction.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({ data: createTransactionDto });
  }

  findAll({ page, perPage }: { page: number; perPage: number }) {
    const paginate = createPaginator({ perPage });

    return paginate<ReadTransactionDto, Prisma.TransactionFindManyArgs>(
      this.prisma.transaction,
      {
        orderBy: { id: "desc" },
      },
      {
        page,
      },
    );
  }

  findOne(id: number) {
    return this.prisma.transaction.findUnique({ where: { id } });
  }

  findManyByUploadId(
    uploadId: number,
    { page, perPage }: { page: number; perPage: number },
  ) {
    const paginate = createPaginator({ perPage });

    return paginate<ReadTransactionDto, Prisma.TransactionFindManyArgs>(
      this.prisma.transaction,
      {
        where: { uploadId },
        orderBy: { id: "desc" },
      },
      {
        page,
      },
    );
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  remove(id: number) {
    return this.prisma.transaction.delete({ where: { id } });
  }
}
