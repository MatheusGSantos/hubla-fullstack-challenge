import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NotFoundInterceptor } from "./interceptors/not-found.interceptor";
import { ValidationPipe } from "@nestjs/common";
import { ConflictInterceptor } from "./interceptors/conflict.interceptor";
import { DatabaseInterceptor } from "./interceptors/database.interceptor";
import { UnauthorizedInterceptor } from "./interceptors/unauthorized.interceptor";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });

  app.use(cookieParser());

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Interceptors
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
