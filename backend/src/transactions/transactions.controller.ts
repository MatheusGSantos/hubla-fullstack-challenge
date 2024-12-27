import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";

@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll(
    @Query("page") page = 1,
    @Query("limit") limit = 10,
    @Query("uploadId") uploadId?: number,
  ) {
    if (uploadId) {
      return this.transactionsService.findManyByUploadId(uploadId, {
        page,
        limit,
      });
    }
    return this.transactionsService.findAll({ page, limit });
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.transactionsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.transactionsService.remove(id);
  }
}
