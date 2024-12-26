import { IsNotEmpty, IsNumber, IsString, IsDateString } from "class-validator";

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  type: number;

  @IsDateString()
  @IsNotEmpty()
  timestamp: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  seller: string;

  @IsNumber()
  @IsNotEmpty()
  uploadId: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
