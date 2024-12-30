import { Injectable } from "@nestjs/common";
import { CreateUploadDto } from "./dto/create-upload.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { TransactionsService } from "../transactions/transactions.service";
import { BadRequestError } from "../errors/BadRequest.error";
import { createPaginator } from "prisma-pagination";
import { ReadUploadDto } from "./dto/read-upload.dto";

@Injectable()
export class UploadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionsService: TransactionsService,
  ) {}

  async create(createUploadDto: CreateUploadDto) {
    const data: Prisma.UploadCreateInput = {
      filename: createUploadDto.file.originalname,
    };
    let uploadId: number;

    try {
      const { id } = await this.prisma.upload.create({ data });
      uploadId = id;
      const { buffer } = createUploadDto.file;
      // parse each line of the file
      const lines = buffer.toString().split("\n");

      for (const line of lines) {
        if (line.length) {
          const transactionType = +line[0];
          const timestamp = new Date(line.slice(1, 26)).toISOString();
          const description = line.slice(26, 56).trim();
          const value = +line.slice(56, 66).trim();
          const seller = line.slice(66, 86).trim();

          await this.transactionsService.create({
            type: transactionType,
            timestamp,
            description,
            value,
            seller,
            uploadId,
          });
        }
      }
    } catch {
      if (uploadId) {
        await this.prisma.upload.delete({ where: { id: uploadId } });
      }

      throw new BadRequestError("Invalid file format");
    }
  }

  findAll({ page, perPage }: { page: number; perPage: number }) {
    const paginate = createPaginator({ perPage });

    return paginate<ReadUploadDto, Prisma.TransactionFindManyArgs>(
      this.prisma.upload,
      {
        orderBy: { id: "desc" },
      },
      {
        page,
      },
    );
  }

  async findTransactionsByUploadId(uploadId: number) {
    const transactions = await this.prisma.transaction.findMany({
      where: { uploadId },
      orderBy: { id: "desc" },
    });

    // Calculate balances
    const { producerBalance, afiliatesBalance } = transactions.reduce(
      (acc, transaction) => {
        const amount = transaction.value;
        switch (transaction.type) {
          case 1:
            acc.producerBalance += amount;
            break;
          case 2:
            acc.afiliatesBalance += amount;
            break;
          case 3:
            acc.afiliatesBalance -= amount;
            break;
          case 4:
            acc.producerBalance += amount;
            break;
        }
        return acc;
      },
      { producerBalance: 0, afiliatesBalance: 0 },
    );

    return { transactions, balances: { producerBalance, afiliatesBalance } };
  }

  findOne(id: number) {
    return this.prisma.upload.findUnique({ where: { id } });
  }

  remove(id: number) {
    this.prisma.upload.delete({ where: { id } });
  }
}
