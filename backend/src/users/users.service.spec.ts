import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./users.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";

describe("UserService", () => {
  let service: UserService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    prisma = mockDeep<PrismaService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe("create", () => {
    it("should hash the password and create a new user", async () => {
      const createUserDto: CreateUserDto = {
        email: "test@example.com",
        password: "securepassword123",
        name: "Test User",
      };

      const hashedPassword = "hashedpassword123" as never;
      jest.spyOn(bcrypt, "hash").mockResolvedValueOnce(hashedPassword);

      const mockCreatedUser = {
        id: 1,
        email: createUserDto.email,
        password: hashedPassword,
        name: createUserDto.name,
        createdAt: new Date("2021-10-01T00:00:00.000Z"),
        updatedAt: new Date("2021-10-01T00:00:00.000Z"),
      };

      prisma.user.create.mockResolvedValue(mockCreatedUser);

      const result = await service.create(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });

      expect(result).toEqual({
        id: 1,
        email: createUserDto.email,
        name: createUserDto.name,
        createdAt: new Date("2021-10-01T00:00:00.000Z"),
        updatedAt: new Date("2021-10-01T00:00:00.000Z"),
        password: undefined,
      });
    });
  });

  describe("findById", () => {
    it("should call prisma.user.findUnique with the correct id", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
        password: "hashedpassword",
        createdAt: new Date("2021-10-01T00:00:00.000Z"),
        updatedAt: new Date("2021-10-01T00:00:00.000Z"),
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findById(1);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe("findByEmail", () => {
    it("should call prisma.user.findUnique with the correct email", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
        password: "hashedpassword",
        createdAt: new Date("2021-10-01T00:00:00.000Z"),
        updatedAt: new Date("2021-10-01T00:00:00.000Z"),
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findByEmail("test@example.com");

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(result).toEqual(mockUser);
    });
  });
});
