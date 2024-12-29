import { Module } from "@nestjs/common";
import { UploadsService } from "./uploads.service";
import { UploadsController } from "./uploads.controller";
import { TransactionsService } from "../transactions/transactions.service";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, TransactionsService],
  imports: [PrismaModule],
})
export class UploadsModule {}
