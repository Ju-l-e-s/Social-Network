import pino from "pino";
import { env } from "@/config/env";

export const logger = pino({
  name: "groupomania-api",
  level: env.NODE_ENV === "production" ? "info" : "debug",
  transport:
    env.NODE_ENV === "production"
      ? undefined
      : {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
});
