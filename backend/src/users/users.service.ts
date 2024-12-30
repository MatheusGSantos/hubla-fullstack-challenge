import { Injectable } from "@nestjs/common";

// Prisma
import { Prisma } from "@prisma/client";

// Models
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

// Bcrypt
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { DatabaseError } from "src/errors/DatabaseError";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    try {
      const createdUser = await this.prisma.user.create({ data });

      return {
        ...createdUser,
        password: undefined,
      };
    } catch (error) {
      if (error.code === "P2002") {
        throw new DatabaseError("Email already exists");
      }

      throw error;
    }
  }

  findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
