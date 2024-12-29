import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Public } from "../auth/public.decorator";
import { AuthRequest } from "src/auth/model/AuthRequest";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  findCurrentUser(@Req() req: AuthRequest) {
    const user = req.user;
    return user;
  }
}
