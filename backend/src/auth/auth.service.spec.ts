import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { UnauthorizedError } from "../errors/UnauthorizedError";

describe("AuthService", () => {
  let service: AuthService;
  let jwtService: jest.Mocked<JwtService>;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const mockJwtService = {
      sign: jest.fn(),
    };

    const mockUserService = {
      findByEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get(JwtService);
    userService = module.get(UserService);
  });

  describe("login", () => {
    it("should return an access token if the credentials are valid", async () => {
      const email = "test@example.com";
      const password = "securepassword123";
      const mockUser = {
        id: 1,
        email,
        name: "Test User",
      };

      const mockPayload = {
        username: mockUser.email,
        name: mockUser.name,
        sub: mockUser.id,
      };

      // Mock validateUser to isolate login logic
      jest.spyOn(service as any, "validateUser").mockResolvedValue(mockUser);

      jwtService.sign.mockReturnValue("testAccessToken");

      const result = await service.login(email, password);

      expect(service["validateUser"]).toHaveBeenCalledWith(email, password);
      expect(jwtService.sign).toHaveBeenCalledWith(mockPayload);
      expect(result).toEqual({ accessToken: "testAccessToken" });
    });

    it("should throw UnauthorizedError if credentials are invalid", async () => {
      const email = "test@example.com";
      const password = "wrongpassword";

      // Mock validateUser to throw an error
      jest
        .spyOn(service as any, "validateUser")
        .mockRejectedValue(
          new UnauthorizedError(
            "Email address or password provided is incorrect.",
          ),
        );

      await expect(service.login(email, password)).rejects.toThrow(
        UnauthorizedError,
      );

      expect(service["validateUser"]).toHaveBeenCalledWith(email, password);
      expect(jwtService.sign).not.toHaveBeenCalled();
    });
  });

  describe("validateUser", () => {
    it("should return a user without the password and timestamps if the credentials are valid", async () => {
      const email = "test@example.com";
      const password = "securepassword123";
      const mockUser = {
        id: 1,
        email,
        name: "Test User",
        password: "hashedpassword",
        createdAt: new Date("2021-10-01T00:00:00.000Z"),
        updatedAt: new Date("2021-10-01T00:00:00.000Z"),
      };

      userService.findByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);

      const result = await service["validateUser"](email, password);

      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
      expect(result).toEqual({
        ...mockUser,
        password: undefined,
      });
    });

    it("should throw UnauthorizedError if the user does not exist", async () => {
      const email = "test@example.com";
      const password = "securepassword123";

      userService.findByEmail.mockResolvedValue(null);

      const bcryptCompareSpy = jest.spyOn(bcrypt, "compare");

      await expect(service["validateUser"](email, password)).rejects.toThrow(
        UnauthorizedError,
      );

      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(bcryptCompareSpy).not.toHaveBeenCalled();
    });

    it("should throw UnauthorizedError if the password is incorrect", async () => {
      const email = "test@example.com";
      const password = "wrongpassword";
      const mockUser = {
        id: 1,
        email,
        name: "Test User",
        password: "hashedpassword",
        createdAt: new Date("2021-10-01T00:00:00.000Z"),
        updatedAt: new Date("2021-10-01T00:00:00.000Z"),
      };

      userService.findByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

      await expect(service["validateUser"](email, password)).rejects.toThrow(
        UnauthorizedError,
      );

      expect(userService.findByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
    });
  });
});
