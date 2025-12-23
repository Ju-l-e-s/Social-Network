import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import { env } from "@/config/env";
import { router as healthRouter } from "@/modules/health/health.routes";
import { router as postsRouter } from "@/modules/posts/posts.routes";
import { router as authRouter } from "@/modules/auth/auth.routes";
import { router as profileRouter } from "@/modules/profiles/profile.routes";
import { router as uploadRouter } from "@/modules/uploads/upload.routes";
import { errorHandler } from "@/middlewares/error-handler";

const allowedOrigins = new Set([env.FRONTEND_URL]);
if (env.NODE_ENV === "development") {
  allowedOrigins.add("http://localhost:3000");
  allowedOrigins.add("http://localhost:3001");
}

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: Array.from(allowedOrigins),
      credentials: true,
    }),
  );
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
  app.use(
    "/uploads",
    express.static(path.join(process.cwd(), "uploads")),
  );

  app.use("/api/health", healthRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/profiles", profileRouter);
  app.use("/api/uploads", uploadRouter);
  app.use("/api/posts", postsRouter);
  app.use(errorHandler);

  return app;
}
