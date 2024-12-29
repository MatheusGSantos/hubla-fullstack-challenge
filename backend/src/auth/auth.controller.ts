import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequestBody } from "./dto/login-request-body.dto";
import { Public } from "./public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  login(@Body() { email, password }: LoginRequestBody) {
    return this.authService.login(email, password);
  }
}
