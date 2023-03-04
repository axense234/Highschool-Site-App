// Express
import { NextFunction, Request, Response } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
import { verifyJWT } from "../utils/jwt";
import { getCachedJWT } from "../utils/redis";

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
  }
}

const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const jwtFromRedis = await getCachedJWT();

  if (
    (!authorization || !authorization.startsWith("Bearer ")) &&
    !jwtFromRedis
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please enter the Bearer Token in the auth header!",
      failedJWT: jwtFromRedis,
    });
  }

  const token = authorization?.split(" ")[1] || (jwtFromRedis as string);

  try {
    const payload = verifyJWT(token);
    req.user = payload;
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Unauthorized.", error });
  }
};

export default authenticationMiddleware;
