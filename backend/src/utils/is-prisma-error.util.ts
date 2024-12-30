import { PrismaClientError } from "../errors/PrismaClientError";

export const isPrismaError = (e: PrismaClientError): boolean => {
  return (
    typeof e.code === "string" &&
    typeof e.clientVersion === "string" &&
    (typeof e.meta === "undefined" ||
      (typeof e.meta === "object" &&
        Array.isArray(e.meta.target) &&
        e.meta.target.every((item) => typeof item === "string")))
  );
};
