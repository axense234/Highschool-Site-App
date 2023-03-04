// Redis
import { redisClient } from "../db/redis";

const cacheJWT = async (jwt: string) => {
  await redisClient.set("ltvbp_jwt", jwt);
};

const getCachedJWT = async () => {
  const jwt = await redisClient.get("ltvbp_jwt");
  return jwt;
};

export { cacheJWT, getCachedJWT };
