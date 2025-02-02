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
import { ReadTransactionDto } from "./dto/read-transaction.dto";
import { ApiPaginatedResponse } from "../decorators/api-paginated-response.decorator";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("transactions")
@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @ApiPaginatedResponse(ReadTransactionDto)
  findAll(
    @Query("page") page: number = 1,
    @Query("perPage") perPage: number = 10,
  ) {
    return this.transactionsService.findAll({ page, perPage });
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
