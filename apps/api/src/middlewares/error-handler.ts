import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "@/lib/logger";

export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      issues: err.flatten(),
    });
  }

  const status = err instanceof ApiError ? err.statusCode : 500;
  if (status >= 500) {
    logger.error({ err }, "Unhandled error");
  }

  return res.status(status).json({
    message: err.message || "Internal server error",
  });
}
