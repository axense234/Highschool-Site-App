// Redis
import { createClient } from "redis";
// Config
import redisClientConfig from "../config/redisClientConfig";

const redisClient = createClient(redisClientConfig);

const connectToRedis = async () => {
  await redisClient.connect();
};

export { connectToRedis, redisClient };
