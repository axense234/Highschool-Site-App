// Redis
import { redisClient } from "../db/redis";

const cacheJWT = async (jwt: string) => {
  await redisClient.setEx("ltvbp_jwt", 10800, jwt);
};

const getCachedJWT = async () => {
  const jwt = await redisClient.get("ltvbp_jwt");
  return jwt;
};

const deleteCachedJWT = async (key: string) => {
  await redisClient.del(key);
};

export { cacheJWT, getCachedJWT, deleteCachedJWT };
