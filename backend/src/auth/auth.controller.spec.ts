import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LoginRequestBody } from "./dto/login-request-body.dto";
import { Response } from "express";
import * as httpMocks from "node-mocks-http";

describe("AuthController", () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const mockService = {
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get(AuthService);
  });

  describe("login", () => {
    it("should call AuthService.login with the correct email and password", async () => {
      const mockRequestBody: LoginRequestBody = {
        email: "test@example.com",
        password: "securepassword123",
      };

      const mockResponse = httpMocks.createResponse() as Response;

      service.login.mockResolvedValueOnce({
        accessToken: "testAccessToken",
      });

      await controller.login(mockRequestBody, mockResponse);

      expect(service.login).toHaveBeenCalledWith(
        mockRequestBody.email,
        mockRequestBody.password,
      );
    });

    it("should set the JWT cookie and return a success message", async () => {
      const mockRequestBody: LoginRequestBody = {
        email: "test@example.com",
        password: "securepassword123",
      };

      const mockResponse = httpMocks.createResponse<Response>();
      mockResponse.cookie = jest.fn(); // Mock the cookie function

      service.login.mockResolvedValueOnce({
        accessToken: "testAccessToken",
      });

      await controller.login(mockRequestBody, mockResponse);

      // Verify the cookie was set
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        "jwt",
        "testAccessToken",
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
        },
      );

      // Verify the response message
      const responseData = mockResponse._getData();
      expect(responseData).toEqual({
        message: "Login successful",
      });
    });
  });
});
