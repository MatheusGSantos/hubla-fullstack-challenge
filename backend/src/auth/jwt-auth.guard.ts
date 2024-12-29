import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { of } from "rxjs";
import { Response } from "express";
import { map, mergeMap, takeWhile, tap } from "rxjs/operators";

import { AuthGuard } from "@nestjs/passport";

import { UserService } from "../users/users.service";

import { UserFromJwt } from "./model/UserFromJwt";
import { AuthRequest } from "./model/AuthRequest";

import { IS_PUBLIC_KEY } from "./public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(
    private reflector: Reflector,
    @Inject(UserService) private readonly userService: UserService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canActivate = super.canActivate(context);

    if (typeof canActivate === "boolean") {
      return canActivate;
    }

    return of(canActivate).pipe(
      mergeMap((value) => value),
      takeWhile((value) => value),
      map(() => context.switchToHttp().getRequest<AuthRequest>()),
      mergeMap((request) =>
        of(request).pipe(
          map((req) => {
            if (!req.user) {
              throw Error("User was not found in request.");
            }

            return req.user;
          }),
          mergeMap((userFromJwt: UserFromJwt) =>
            this.userService.findById(userFromJwt.id),
          ),
          tap((user) => {
            request.principal = user;
          }),
        ),
      ),
      map((user) => Boolean(user)),
    );
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const res = context.switchToHttp().getResponse<Response>();

    if (err || !user) {
      // Clear the cookie when the token is invalid/missing/expired
      res.clearCookie("jwt");

      throw new UnauthorizedException("Invalid credentials. Please log in.");
    }

    return user;
  }
}
