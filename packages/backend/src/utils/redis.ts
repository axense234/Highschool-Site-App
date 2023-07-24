// Redis
import { redisClient } from "../db/redis";

const cacheJWT = async (jwt: string, uniqueIdentifier: string) => {
  await redisClient.setEx(
    `${uniqueIdentifier}:hsa-jwt`,
    Number(process.env.JWT_EXP_DURATION?.split("h")[0]) * 3600,
    jwt
  );
};

const getCachedJWT = async (uniqueIdentifier: string) => {
  const testallkeys = await redisClient.keys("*");
  console.log(testallkeys);
  const jwt = await redisClient.get(`${uniqueIdentifier}:hsa-jwt`);
  return jwt;
};

const cachePassResetToken = async (uniqueIdentifier: string) => {
  await redisClient.setEx(
    `${uniqueIdentifier}:hsa-pass-token`,
    Number(process.env.PASS_TOKEN_EXP_DURATION?.split("h")[0]) * 3600,
    uniqueIdentifier
  );
};

const getPassResetToken = async (uniqueIdentifier: string) => {
  const token = await redisClient.get(`${uniqueIdentifier}:hsa-pass-token`);
  return token;
};

const deleteCachedJWT = async (key: string) => {
  await redisClient.del(key);
};

export {
  cacheJWT,
  getCachedJWT,
  deleteCachedJWT,
  cachePassResetToken,
  getPassResetToken,
};
