import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { UploadsService } from "./uploads.service";
import { CreateUploadDto } from "./dto/create-upload.dto";

@Controller("uploads")
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  create(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadsService.create(createUploadDto);
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
