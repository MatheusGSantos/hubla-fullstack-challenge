import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { BadRequestError } from "src/errors/BadRequest.error";

@Injectable()
export class BadRequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof BadRequestError) {
          throw new BadRequestException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
