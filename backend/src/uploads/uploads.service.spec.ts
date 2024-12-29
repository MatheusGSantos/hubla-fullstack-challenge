import { Test, TestingModule } from "@nestjs/testing";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";

import { UploadsService } from "./uploads.service";
import { PrismaService } from "../prisma/prisma.service";
import { TransactionsService } from "../transactions/transactions.service";
import { BadRequestError } from "../errors/BadRequest.error";

describe("UploadsService", () => {
  let service: UploadsService;

  let prismaService: DeepMockProxy<PrismaClient>;

  let transactionsService: jest.Mocked<TransactionsService>;

  beforeEach(async () => {
    prismaService = mockDeep<PrismaClient>();

    const transactionsServiceMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      findTransactionsByUploadId: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadsService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
        {
          provide: TransactionsService,
          useValue: transactionsServiceMock,
        },
      ],
    }).compile();

    service = module.get<UploadsService>(UploadsService);
    transactionsService = module.get(
      TransactionsService,
    ) as jest.Mocked<TransactionsService>;
  });

  describe("create", () => {
    it("should create an upload and successfully process the file lines", async () => {
      prismaService.upload.create.mockResolvedValue({ id: 1 } as any);

      const file = {
        originalname: "test.txt",
        buffer: Buffer.from(
          "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS\n" +
            "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS",
        ),
      } as Express.Multer.File;

      await service.create({ file });

      expect(prismaService.upload.create).toHaveBeenCalledWith({
        data: { filename: "test.txt" },
      });

      expect(transactionsService.create).toHaveBeenCalledTimes(2);

      expect(transactionsService.create).toHaveBeenNthCalledWith(1, {
        type: 1,
        timestamp: expect.any(String),
        description: "CURSO DE BEM-ESTAR",
        value: 12750,
        seller: "JOSE CARLOS",
        uploadId: 1,
      });

      expect(transactionsService.create).toHaveBeenNthCalledWith(2, {
        type: 1,
        timestamp: expect.any(String),
        description: "CURSO DE BEM-ESTAR",
        value: 12750,
        seller: "JOSE CARLOS",
        uploadId: 1,
      });
    });

    it("should throw BadRequestError and delete the upload if the file is invalid", async () => {
      prismaService.upload.create.mockResolvedValue({ id: 1 } as any);

      const file = {
        originalname: "test.txt",
        buffer: Buffer.from("Linha inválida que não respeita o formato."),
      } as Express.Multer.File;

      await expect(service.create({ file })).rejects.toThrow(BadRequestError);

      expect(prismaService.upload.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe("findAll", () => {
    it("should paginate and return uploads correctly", async () => {
      prismaService.upload.findMany.mockResolvedValue([
        { id: 10, filename: "upload10.txt" },
        { id: 9, filename: "upload9.txt" },
      ] as any);

      const result = await service.findAll({ page: 1, perPage: 2 });

      expect(result).toBeDefined();

      expect(result.data).toHaveLength(2);
      expect(result.data).toEqual(
        expect.arrayContaining([
          { id: 10, filename: "upload10.txt" },
          { id: 9, filename: "upload9.txt" },
        ]),
      );
    });
  });

  describe("findTransactionsByUploadId", () => {
    it("should return transactions and calculate balances correctly", async () => {
      prismaService.transaction.findMany.mockResolvedValue([
        { id: 1, type: 1, value: 100, uploadId: 1 },
        { id: 2, type: 2, value: 50, uploadId: 1 },
        { id: 3, type: 3, value: 30, uploadId: 1 },
        { id: 4, type: 4, value: 70, uploadId: 1 },
      ] as any);

      const result = await service.findTransactionsByUploadId(1);

      expect(prismaService.transaction.findMany).toHaveBeenCalledWith({
        where: { uploadId: 1 },
        orderBy: { id: "desc" },
      });

      expect(result.transactions).toHaveLength(4);
      expect(result.balances).toEqual({
        producerBalance: 170, // (100 + 70)
        afiliatesBalance: 20, // (50 - 30)
      });
    });
  });

  describe("findOne", () => {
    it("should find an upload by ID", async () => {
      prismaService.upload.findUnique.mockResolvedValue({
        id: 1,
        filename: "upload1.txt",
      } as any);

      const result = await service.findOne(1);

      expect(prismaService.upload.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual({ id: 1, filename: "upload1.txt" });
    });
  });

  describe("remove", () => {
    it("should remove an upload by ID", async () => {
      prismaService.upload.delete.mockResolvedValue({} as any);

      service.remove(1);

      expect(prismaService.upload.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
