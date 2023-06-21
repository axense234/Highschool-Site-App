// Prisma
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
// Express
import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  const customError = {
    msg: err.message || "Default Error Message",
    code: err.code || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (customError.code === "P2002") {
    customError.msg = `Introduceți un email unic!`;
    customError.code = StatusCodes.BAD_REQUEST;
  }

  if (err instanceof PrismaClientValidationError) {
    customError.msg = "Please provide accurate properties!";
    customError.code = StatusCodes.BAD_REQUEST;
  }

  return res.status(customError.code).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
