// Redis
import { redisClient } from "../db/redis";

const cacheJWT = async (jwt: string, uniqueIdentifier: string) => {
  console.log(
    "cache jwt seconds: ",
    Number(process.env.JWT_EXP_DURATION?.split("h")[0]) * 3600
  );
  await redisClient.setEx(
    `${uniqueIdentifier}:hsa-jwt`,
    Number(process.env.JWT_EXP_DURATION?.split("h")[0]) * 3600,
    jwt
  );
};

const getCachedJWT = async (uniqueIdentifier: string) => {
  const jwt = await redisClient.get(`${uniqueIdentifier}:hsa-jwt`);
  return jwt;
};

const deleteCachedJWT = async (key: string) => {
  await redisClient.del(key);
};

export { cacheJWT, getCachedJWT, deleteCachedJWT };
