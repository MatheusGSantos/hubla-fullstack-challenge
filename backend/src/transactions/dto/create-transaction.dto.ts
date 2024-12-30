import { IsNotEmpty, IsNumber, IsString, IsDateString } from "class-validator";

export class CreateTransactionDto {
  /**
   * The type of the transaction (1 to 4)
   * @example 1
   */
  @IsNumber()
  @IsNotEmpty()
  type: number;

  /**
   * The timestamp of the transaction
   * @example 2021-09-01T00:00:00.000Z
   */
  @IsDateString()
  @IsNotEmpty()
  timestamp: string;

  /**
   * The value of the transaction in cents
   * @example 100
   */
  @IsNumber()
  @IsNotEmpty()
  value: number;

  /**
   * The seller of the transaction
   * @example John Doe
   * */
  @IsString()
  @IsNotEmpty()
  seller: string;

  /**
   * The id the file that lists the transaction
   * @example 32
   * */
  @IsNumber()
  @IsNotEmpty()
  uploadId: number;

  /**
   * The description of the transaction
   * @example A description
   * */
  @IsString()
  @IsNotEmpty()
  description: string;
}
