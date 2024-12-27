import { Injectable } from "@nestjs/common";
import { CreateUploadDto } from "./dto/create-upload.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { TransactionsService } from "src/transactions/transactions.service";
import { BadRequestError } from "src/errors/bad-request.error";
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

    const { id } = await this.prisma.upload.create({ data });

    const { buffer } = createUploadDto.file;

    try {
      // parse each line of the file
      const lines = buffer.toString().split("\n");

      lines.forEach(async (line) => {
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
            uploadId: id,
          });
        }
      });
    } catch {
      await this.prisma.upload.delete({ where: { id } });

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

  findOne(id: number) {
    return this.prisma.upload.findUnique({ where: { id } });
  }

  remove(id: number) {
    this.prisma.upload.delete({ where: { id } });
  }
}
