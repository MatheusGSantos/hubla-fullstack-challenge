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
  Query,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadsService } from "./uploads.service";
import { BadRequestError } from "../errors/BadRequest.error";
import { ApiPaginatedResponse } from "../decorators/api-paginated-response.decorator";
import { ReadUploadDto } from "./dto/read-upload.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("uploads")
@Controller("uploads")
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  /**
   * Needs to be a .txt file and not more than 500kb, formdata key should be "file"
   * @param file The file to upload
   * */
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

  /**
   * @param page The page number
   * @param perPage The number of items per page
   * @returns A paginated list of uploads
   * */
  @Get()
  @ApiPaginatedResponse(ReadUploadDto)
  findAll(
    @Query("page") page: number = 1,
    @Query("perPage") perPage: number = 10,
  ) {
    return this.uploadsService.findAll({ page, perPage });
  }

  /**
   * @param id The id of the upload
   * @returns A list of transactions for the upload
   * */
  @Get([":id/transactions"])
  findTransactionsByUpload(@Param("id") id: number) {
    return this.uploadsService.findTransactionsByUploadId(id);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.uploadsService.findOne(id);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: number) {
    this.uploadsService.remove(id);
  }
}
