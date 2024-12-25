import { IsString } from "class-validator";
import { Upload } from "../entities/upload.entity";

export class CreateUploadDto extends Upload {
  @IsString()
  filename: string;
}
