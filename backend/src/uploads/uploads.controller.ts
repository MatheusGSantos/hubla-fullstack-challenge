import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadsService } from "./uploads.service";
import { BadRequestError } from "src/errors/bad-request.error";

@Controller("uploads")
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor("file"))
  async create(@UploadedFile() file: Express.Multer.File) {
    // needs to be .txt and not more than 500kb
    const improperFile =
      !file?.mimetype?.includes("text") || file.size > 500000;

    if (improperFile) {
      throw new BadRequestError(
        "File must be a .txt file and not more than 500kb",
      );
    }

    this.uploadsService.create({ file });
  }

  @Get()
  findAll() {
    return this.uploadsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.uploadsService.findOne(+id);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: number) {
    this.uploadsService.remove(+id);
  }
}
