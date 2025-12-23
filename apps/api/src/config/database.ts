import mongoose from "mongoose";
import { env } from "@/config/env";
import { logger } from "@/lib/logger";

export async function connectDatabase() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info("✅ Connected to MongoDB");
  } catch (error) {
    logger.error({ error }, "❌ MongoDB connection failed");
    throw error;
  }
}
