// Express
import { Request, Response } from "express";
// Others
import { StatusCodes } from "http-status-codes";
import * as uuid from "uuid";
import { encryptPassword } from "../utils/bcrypt";
// Prisma
import { setariUtilizatorClient, utlizatorClient } from "../db/postgres";

// ADD USER TO REQUEST(need feedback)
declare module "express-serve-static-core" {
  export interface Request {
    user: any;
    cookies: any;
  }
}

// GET ALL USERS
const getAllUsers = async (req: Request, res: Response) => {
  const foundUsers = await utlizatorClient.findMany({});

  if (foundUsers.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Could not find any users!", users: [] });
  }

  return res.status(StatusCodes.OK).json({
    nbHits: foundUsers.length,
    msg: `Successfully found ${foundUsers.length} users!`,
    users: foundUsers,
  });
};

// GET SINGLE USER by USER UID or JWT
const getUserByIdOrJWT = async (req: Request, res: Response) => {
  const userId =
    req.params.userId === "false" || !req.params.userId
      ? req.user.userId
      : req.params.userId;

  if (req.cookies.uniqueIdentifier === undefined) {
    const uniqueIdentifier = uuid.v4();
    res.cookie("uniqueIdentifier", uniqueIdentifier, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });
  }

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a userId in the request params!", user: {} });
  }

  const foundUser = await utlizatorClient.findUnique({
    where: { utilizator_uid: userId },
  });

  if (!foundUser) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Could not find user with id:${userId}!`, user: {} });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found user:${foundUser.username}!`,
    user: foundUser,
  });
};

// UPDATE USER by USER UID or JWT
const updateUserByIdOrJWT = async (req: Request, res: Response) => {
  const userId =
    req.params.userId === "false" || !req.params.userId
      ? req.user.userId
      : req.params.userId;

  const userBody = req.body;

  userBody.rolUtilizator = "ADMIN";

  if (!userBody.username || !userBody.email || !userBody.password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Vă rog să introduceți un username, un email si o parolă.",
      user: {},
    });
  }

  if (userBody.password && userBody.password === "PAROLA") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Vă rog să introduceți altă parola înafară de PAROLA",
      user: {},
    });
  }

  if (userBody.password) {
    const encryptedPassword = await encryptPassword(userBody.password);

    userBody.password = encryptedPassword;
  }

  if (!userId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not any userId in the request params!",
      user: {},
    });
  }

  const updatedUser = await utlizatorClient.update({
    where: { utilizator_uid: userId },
    data: { ...userBody },
  });

  if (!updatedUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Could not find user with id:${userId} to update or the update body was invalid!`,
      user: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated user:${updatedUser.username}!`,
    user: updatedUser,
  });
};

// DELETE USER by USER UID or JWT
const deleteUserByIdOrJWT = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Could not any userId in the request params!", user: {} });
  }

  const deletedSettings = await setariUtilizatorClient.delete({
    where: { utilizator_uid: userId },
  });

  if (!deletedSettings) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Could not find settings with user id: ${userId} to delete!`,
      user: {},
    });
  }

  const deletedUser = await utlizatorClient.delete({
    where: { utilizator_uid: userId },
  });

  if (!deletedUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any users to delete with the id:${userId}!`,
      user: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted user:${deletedUser.username}!`,
    user: deletedUser,
  });
};

// EXPORTS
export {
  getUserByIdOrJWT,
  deleteUserByIdOrJWT,
  getAllUsers,
  updateUserByIdOrJWT,
};
