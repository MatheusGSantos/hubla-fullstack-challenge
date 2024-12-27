import { Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({ data: createTransactionDto });
  }

  findAll({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    return this.prisma.transaction.findMany({
      skip,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.prisma.transaction.findUnique({ where: { id } });
  }

  findManyByUploadId(
    uploadId: number,
    { page, limit }: { page: number; limit: number },
  ) {
    const skip = (page - 1) * limit;
    return this.prisma.transaction.findMany({
      where: { uploadId },
      skip,
      take: limit,
    });
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
