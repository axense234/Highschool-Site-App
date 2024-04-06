// Express
import { Request, Response, NextFunction } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { accountCodeClient } from "../db/postgres";

const accountCodeValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userBody = req.body;
  const { userType } = req.params;

  if (userType) {
    if (!userBody.accountCode) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Introduceți un cod de cont!", user: {} });
    }

    const findAccountCode = await accountCodeClient.findUnique({
      where: { value: userBody.accountCode },
    });

    if (!findAccountCode) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: `Nu am găsit un cod valabil cu valoarea: ${userBody.accountCode}!`,
        user: {},
      });
    }

    delete userBody.accountCode;

    await accountCodeClient.delete({
      where: { code_uid: findAccountCode.code_uid },
    });
  }
  next();
};

export default accountCodeValidation;
