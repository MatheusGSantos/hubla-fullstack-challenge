import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Public } from "../auth/public.decorator";
import { AuthRequest } from "src/auth/model/AuthRequest";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * @returns The current user
   * @example { id: 1, email: "user@email.com", name: "User" }
   */
  @UseGuards(JwtAuthGuard)
  @Get("me")
  findCurrentUser(@Req() req: AuthRequest) {
    const user = req.user;
    return user;
  }
}
