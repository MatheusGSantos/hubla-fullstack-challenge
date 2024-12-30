import { User } from "../entities/user.entity";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto extends User {
  /**
   * The email of the user
   * @example email@email.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * The password of the user
   * @example strongPassword123
   */
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Password doesn't meet requirements",
  })
  password: string;

  /**
   * The name of the user
   * @example John Doe
   */
  @IsString()
  @IsNotEmpty()
  name: string;
}
