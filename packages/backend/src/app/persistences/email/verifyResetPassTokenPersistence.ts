// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { getPassResetToken } from "../../../utils/redis";

const verifyResetPassTokenPersistence = async (token: string) => {
  const foundToken = await getPassResetToken(token as string);

  if (!foundToken) {
    return {
      msg: "Could not find reset pass token or it expired.",
      statusCode: StatusCodes.GONE,
    };
  }

  return { msg: "Reset pass token is valid.", statusCode: StatusCodes.OK };
};

export default verifyResetPassTokenPersistence;
