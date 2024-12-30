import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequestBody } from "./dto/login-request-body.dto";
import { Public } from "./public.decorator";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @param email The email of the user
   * @param password The password of the user
   * @returns A message indicating the login was successful and sets a cookie with the JWT
   * @example { message: "Login successful" }
   */
  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() { email, password }: LoginRequestBody,
    @Res() res: Response,
  ) {
    const { accessToken } = await this.authService.login(email, password);

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // lax for local testing
    });

    return res.send({ message: "Login successful" });
  }
}
