import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthRequest } from "../auth/model/AuthRequest";
import { validate } from "class-validator";

describe("UserController", () => {
  let controller: UserController;
  let service: jest.Mocked<UserService>;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get(UserService);
  });

  describe("create", () => {
    it("should call UserService.create with the correct data", async () => {
      const createUserDto: CreateUserDto = {
        email: "test@example.com",
        password: "SecurePassword123!",
        name: "Test User",
      };

      await controller.create(createUserDto);

      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });

    it("should validate the CreateUserDto properties", async () => {
      const invalidCreateUserDto = {
        email: "invalid-email",
        password: "weak",
        name: "",
      };

      const dto = Object.assign(new CreateUserDto(), invalidCreateUserDto);

      const errors = await validate(dto);

      expect(errors).toBeDefined();
      expect(errors).toHaveLength(3);

      const emailError = errors.find((e) => e.property === "email");
      expect(emailError).toBeDefined();
      expect(emailError?.constraints?.isEmail).toContain("must be an email");
    });
  });

  describe("findCurrentUser", () => {
    it("should return the user from the AuthRequest", () => {
      const mockRequest = {
        user: {
          id: 1,
          email: "test@example.com",
          name: "Test User",
        },
      } as Partial<AuthRequest> as AuthRequest;

      const result = controller.findCurrentUser(mockRequest);

      expect(result).toEqual(mockRequest.user);
    });
  });
});
