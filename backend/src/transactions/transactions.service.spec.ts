import { Test, TestingModule } from "@nestjs/testing";
import { TransactionsService } from "./transactions.service";
import { PrismaService } from "../prisma/prisma.service";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";

describe("TransactionsService", () => {
  let service: TransactionsService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    prisma = mockDeep<PrismaService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  describe("create", () => {
    it("should call prisma.transaction.create with correct data", async () => {
      const createDto: CreateTransactionDto = {
        type: 1,
        timestamp: new Date().toISOString(),
        description: "Test transaction",
        value: 100,
        seller: "Test seller",
        uploadId: 1,
      };

      await service.create(createDto);

      expect(prisma.transaction.create).toHaveBeenCalledWith({
        data: createDto,
      });
    });
  });

  describe("findAll", () => {
    it("should call prisma.transaction.findMany with correct pagination parameters", async () => {
      prisma.transaction.findMany.mockResolvedValue([
        {
          id: 1,
          description: "Transaction 1",
          value: 100,
          type: 1,
          timestamp: new Date("2022-01-01T00:00:00Z"),
          seller: "Test seller",
          uploadId: 1,
        },
        {
          id: 1,
          description: "Transaction 2",
          value: 100,
          type: 1,
          timestamp: new Date("2022-01-01T00:00:00Z"),
          seller: "Test seller",
          uploadId: 1,
        },
      ]);

      const result = await service.findAll({ page: 1, perPage: 2 });

      expect(result).toBeDefined();
      expect(result.data).toHaveLength(2);
      expect(result.data).toEqual(
        expect.arrayContaining([
          {
            id: 1,
            description: "Transaction 1",
            value: 100,
            type: 1,
            timestamp: new Date("2022-01-01T00:00:00Z"),
            seller: "Test seller",
            uploadId: 1,
          },
          {
            id: 1,
            description: "Transaction 2",
            value: 100,
            type: 1,
            timestamp: new Date("2022-01-01T00:00:00Z"),
            seller: "Test seller",
            uploadId: 1,
          },
        ]),
      );
    });
  });

  describe("findOne", () => {
    it("should call prisma.transaction.findUnique with the correct id", async () => {
      const mockTransaction = { id: 1, description: "Transaction 1" };
      prisma.transaction.findUnique.mockResolvedValue(mockTransaction as any);

      const result = await service.findOne(1);

      expect(prisma.transaction.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockTransaction);
    });
  });

  describe("update", () => {
    it("should call prisma.transaction.update with correct id and data", async () => {
      const updateDto: UpdateTransactionDto = {
        description: "Updated transaction",
        value: 150,
      };
      const mockUpdatedTransaction = { id: 1, ...updateDto };
      prisma.transaction.update.mockResolvedValue(
        mockUpdatedTransaction as any,
      );

      const result = await service.update(1, updateDto);

      expect(prisma.transaction.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
      });
      expect(result).toEqual(mockUpdatedTransaction);
    });
  });

  describe("remove", () => {
    it("should call prisma.transaction.delete with the correct id", async () => {
      const mockDeletedTransaction = { id: 1, description: "Transaction 1" };
      prisma.transaction.delete.mockResolvedValue(
        mockDeletedTransaction as any,
      );

      service.remove(1);

      expect(prisma.transaction.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
