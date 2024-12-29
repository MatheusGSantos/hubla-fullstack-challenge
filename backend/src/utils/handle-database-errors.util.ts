import { DatabaseError } from "../errors/DatabaseError";
import { PrismaClientError } from "../errors/PrismaClientError";
import { UniqueConstraintError } from "../errors/UniqueConstraintError";
import { PrismaErrors } from "../prisma/prisma.errors";

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);

    default:
      return new DatabaseError(e.message);
  }
};
