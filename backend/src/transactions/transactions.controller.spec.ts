import { Test, TestingModule } from "@nestjs/testing";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";

describe("TransactionsController", () => {
  let controller: TransactionsController;
  let service: jest.Mocked<TransactionsService>;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [{ provide: TransactionsService, useValue: mockService }],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    service = module.get(TransactionsService);
  });

  describe("create", () => {
    it("should call TransactionsService.create with correct parameters", () => {
      const createDto: CreateTransactionDto = {
        type: 1,
        timestamp: new Date().toISOString(),
        description: "Test transaction",
        value: 100,
        seller: "Test seller",
        uploadId: 1,
      };

      controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe("findAll", () => {
    it("should call TransactionsService.findAll with default pagination parameters", () => {
      controller.findAll();

      expect(service.findAll).toHaveBeenCalledWith({ page: 1, perPage: 10 });
    });

    it("should call TransactionsService.findAll with custom pagination parameters", () => {
      controller.findAll(2, 5);

      expect(service.findAll).toHaveBeenCalledWith({ page: 2, perPage: 5 });
    });
  });

  describe("findOne", () => {
    it("should call TransactionsService.findOne with the correct id", () => {
      controller.findOne(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("update", () => {
    it("should call TransactionsService.update with the correct id and update data", () => {
      const updateDto: UpdateTransactionDto = {
        description: "Updated description",
        value: 200,
      };

      controller.update(1, updateDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe("remove", () => {
    it("should call TransactionsService.remove with the correct id", () => {
      controller.remove(1);

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
