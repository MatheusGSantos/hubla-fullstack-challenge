import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NotFoundInterceptor } from "./interceptors/not-found.interceptor";
import { ValidationPipe } from "@nestjs/common";
import { ConflictInterceptor } from "./utils/conflict.interceptor";
import { UnauthorizedInterceptor } from "./utils/unauthorized.interceptor";
import { DatabaseInterceptor } from "./utils/database.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Interceptors
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
