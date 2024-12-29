import { Test, TestingModule } from "@nestjs/testing";
import { UploadsController } from "./uploads.controller";
import { UploadsService } from "./uploads.service";

describe("UploadsController", () => {
  let controller: UploadsController;
  let service: jest.Mocked<UploadsService>;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findTransactionsByUploadId: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadsController],
      providers: [{ provide: UploadsService, useValue: mockService }],
    }).compile();

    controller = module.get<UploadsController>(UploadsController);
    service = module.get(UploadsService);
  });

  describe("create", () => {
    it("should call UploadsService.create with valid file", async () => {
      const file = {
        mimetype: "text/plain",
        size: 300000,
      } as Express.Multer.File;

      await controller.create(file);

      expect(service.create).toHaveBeenCalledWith({ file });
    });

    it("should throw BadRequestError for invalid file type", async () => {
      const file = {
        mimetype: "application/pdf",
        size: 300000,
      } as Express.Multer.File;

      await expect(controller.create(file)).rejects.toThrow(
        "File must be a .txt file and not more than 500kb",
      );
    });

    it("should throw BadRequestError for oversized file", async () => {
      const file = {
        mimetype: "text/plain",
        size: 600000,
      } as Express.Multer.File;

      await expect(controller.create(file)).rejects.toThrow(
        "File must be a .txt file and not more than 500kb",
      );
    });
  });

  describe("findAll", () => {
    it("should call UploadsService.findAll with default pagination", () => {
      controller.findAll();

      expect(service.findAll).toHaveBeenCalledWith({ page: 1, perPage: 10 });
    });

    it("should call UploadsService.findAll with custom pagination", () => {
      controller.findAll(2, 5);

      expect(service.findAll).toHaveBeenCalledWith({ page: 2, perPage: 5 });
    });
  });

  describe("findTransactionsByUpload", () => {
    it("should call UploadsService.findTransactionsByUploadId with id", () => {
      controller.findTransactionsByUpload(1);

      expect(service.findTransactionsByUploadId).toHaveBeenCalledWith(1);
    });
  });

  describe("findOne", () => {
    it("should call UploadsService.findOne with id", () => {
      controller.findOne(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("remove", () => {
    it("should call UploadsService.remove with id", () => {
      controller.remove(1);

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
