import { Injectable } from "@nestjs/common";
import { CreateUploadDto } from "./dto/create-upload.dto";

@Injectable()
export class UploadsService {
  create(createUploadDto: CreateUploadDto) {
    return "This action adds a new upload";
  }

  findAll() {
    return `This action returns all uploads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
