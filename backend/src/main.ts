import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NotFoundInterceptor } from "./interceptors/not-found.interceptor";
import { ValidationPipe } from "@nestjs/common";

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

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
