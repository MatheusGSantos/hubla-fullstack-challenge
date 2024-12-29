import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UploadsModule } from "./uploads/uploads.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UploadsModule,
    TransactionsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: "APP_GUARD",
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
