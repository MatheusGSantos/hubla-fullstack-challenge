import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Public } from "src/auth/public.decorator";

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
  findCurrentUser(@Request() req) {
    const user = req.user;
    return user;
  }
}
