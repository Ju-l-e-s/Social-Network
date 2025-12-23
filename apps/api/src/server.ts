import { createApp } from "@/app";
import { connectDatabase } from "@/config/database";
import { env } from "@/config/env";
import { logger } from "@/lib/logger";

async function bootstrap() {
  await connectDatabase();
  const app = createApp();
  app.listen(env.PORT, () => {
    logger.info(`🚀 API ready on port ${env.PORT}`);
  });
}

bootstrap().catch((error) => {
  logger.error({ error }, "Unable to start API");
  process.exit(1);
});
