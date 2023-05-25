// Express
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// Prisma
import { setariUtilizatorClient, utlizatorClient } from "../db/postgres";
import { encryptPassword, verifyPassword } from "../utils/bcrypt";
// Utils
import { createJWT } from "../utils/jwt";
import { cacheJWT, deleteCachedJWT } from "../utils/redis";

// SIGN UP / CREATE USER
const createUser = async (req: Request, res: Response) => {
  const userBody = req.body;

  const encryptedPassword = await encryptPassword(userBody.password);

  userBody.password = encryptedPassword;
  userBody.username = userBody.email;

  const createdUser = await utlizatorClient.create({ data: { ...userBody } });

  if (!createdUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not create a user with the data provided!",
      user: {},
    });
  }

  const createdSettings = await setariUtilizatorClient.create({
    data: { utilizator_uid: createdUser.utilizator_uid },
  });

  console.log(createdUser, createdSettings);

  const token = createJWT(createdUser.username, createdUser.utilizator_uid);
  await cacheJWT(token, req.cookies.uniqueIdentifier);

  return res.status(StatusCodes.CREATED).json({
    token,
    msg: `Successfully created user: ${createdUser.username}!`,
    user: createdUser,
  });
};

// LOGIN USER

const loginUser = async (req: Request, res: Response) => {
  const { password, email, rolUtilizator } = req.body;

  if (!password || !email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Precizați email-ul și parola!", user: {} });
  }

  const foundUser = await utlizatorClient.findUnique({ where: { email } });

  if (!foundUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Nu am putut să găsim un cont cu email-ul:${email}!`,
      user: {},
    });
  }

  const passwordsMatch = await verifyPassword(password, foundUser.password);

  if (!passwordsMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: `Parolă greșită!`, user: {} });
  }

  const token = createJWT(foundUser.username, foundUser.utilizator_uid);
  await cacheJWT(token, req.cookies.uniqueIdentifier);

  // Temporarily changing the foundUser user role
  foundUser.rolUtilizator = rolUtilizator;

  return res.status(StatusCodes.OK).json({
    token,
    msg: `Successfully logged in user with email:${foundUser.email}!`,
    user: foundUser,
  });
};

// LOG OUT USER
const logoutUser = async (req: Request, res: Response) => {
  await deleteCachedJWT(`${req.cookies.uniqueIdentifier}:hsa-jwt`);
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully logged out!", user: {} });
};

// EXPORTS
export { createUser, loginUser, logoutUser };
