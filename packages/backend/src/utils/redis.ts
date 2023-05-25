// Redis
import { redisClient } from "../db/redis";

const cacheJWT = async (jwt: string, uniqueIdentifier: string) => {
  await redisClient.setEx(`${uniqueIdentifier}:hsa-jwt`, 10800, jwt);
};

const getCachedJWT = async (uniqueIdentifier: string) => {
  const jwt = await redisClient.get(`${uniqueIdentifier}:hsa-jwt`);
  return jwt;
};

const deleteCachedJWT = async (key: string) => {
  await redisClient.del(key);
};

export { cacheJWT, getCachedJWT, deleteCachedJWT };
