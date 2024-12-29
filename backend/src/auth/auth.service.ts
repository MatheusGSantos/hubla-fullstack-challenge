import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../users/users.service";

import * as bcrypt from "bcrypt";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { UserPayload } from "./model/UserPayload";
import { UserToken } from "./model/UserToken";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(email: string, password: string): Promise<UserToken> {
    const user: User = await this.validateUser(email, password);

    const payload: UserPayload = {
      username: user.email,
      name: user.name,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return { ...user, password: undefined };
      }
    }

    throw new UnauthorizedError(
      `Email address or password provided is incorrect.`,
    );
  }
}
