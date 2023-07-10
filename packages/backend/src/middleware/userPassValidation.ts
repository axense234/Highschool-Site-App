// Express
import { Request, Response, NextFunction } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";

const validateUserPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userBody = req.body;
  if (userBody.password && userBody.password === "PAROLA") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Vă rog să introduceți altă parola în afară de PAROLA",
      user: {},
    });
  }

  if (
    userBody.password &&
    userBody.passwordVer &&
    userBody.password !== userBody.passwordVer
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Introduceti parole identice!", user: {} });
  }

  delete userBody.passwordVer;

  return userBody;
};

export default validateUserPassword;
