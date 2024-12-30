import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginRequestBody {
  /**
   * The email of the user
   * @example email@email.com
   */
  @IsEmail()
  email: string;

  /**
   * The password of the user
   * @example strongPassword123
   */
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
