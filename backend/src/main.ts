import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NotFoundInterceptor } from "./interceptors/not-found.interceptor";
import { ValidationPipe } from "@nestjs/common";
import { ConflictInterceptor } from "./interceptors/conflict.interceptor";
import { DatabaseInterceptor } from "./interceptors/database.interceptor";
import { UnauthorizedInterceptor } from "./interceptors/unauthorized.interceptor";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

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
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalInterceptors(new ConflictInterceptor());

  const config = new DocumentBuilder()
    .setTitle("NestJS API")
    .setDescription("The NestJS API description")
    .setVersion("1.0")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
