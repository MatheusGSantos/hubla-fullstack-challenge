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

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
      sameSite: "none",
    });

    return res.send({ message: "Login successful" });
  }
}
