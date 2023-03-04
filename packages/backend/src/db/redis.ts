// Redis
import { createClient } from "redis";
// Dot env
import * as dotenv from "dotenv";

dotenv.config();

const redisClient = createClient(
  {
    url: process.env.REDIS_INSTANCE,
  } || undefined
);

const connectToRedis = async () => {
  await redisClient.connect();
};

export { connectToRedis, redisClient };
