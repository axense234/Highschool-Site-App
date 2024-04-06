// Status Codes
import { StatusCodes } from "http-status-codes";
import { getOrSetCache } from "utils/redis";
// Utils

const verifyResetPassTokenPersistence = async (
  token: string,
  userId: string
) => {
  const foundToken = await getOrSetCache(
    `${userId}:hsa-pass-token`,
    async () => {
      return "";
    }
  );

  if (!foundToken) {
    return {
      msg: "Could not find reset pass token or it expired.",
      statusCode: StatusCodes.GONE,
    };
  }

  return { msg: "Reset pass token is valid.", statusCode: StatusCodes.OK };
};

export default verifyResetPassTokenPersistence;
