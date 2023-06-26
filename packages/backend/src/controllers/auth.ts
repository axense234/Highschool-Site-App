// Express
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// Prisma
import { adminClient, studentClient, teacherClient } from "../db/postgres";
import { encryptPassword, verifyPassword } from "../utils/bcrypt";
// Utils
import { createJWT } from "../utils/jwt";
import { cacheJWT, deleteCachedJWT } from "../utils/redis";

// SIGN USER / CREATE USER
const createUser = async (req: Request, res: Response) => {
  const userBody = req.body;
  const { userType } = req.params;

  if (!userBody) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter a request body.", user: {} });
  }

  const encryptedPassword = await encryptPassword(userBody.password);

  userBody.password = encryptedPassword;
  if (!userBody.fullname) {
    userBody.fullname = userBody.email;
  }

  let createdUser;
  if (userType === "ADMIN") {
    createdUser = await adminClient.create({ data: { ...userBody } });
    createdUser.id = createdUser.admin_uid;
  } else if (userType === "ELEV") {
    createdUser = await studentClient.create({ data: { ...userBody } });
    createdUser.id = createdUser.student_uid;
  } else if (userType === "PROFESOR") {
    createdUser = await teacherClient.create({ data: { ...userBody } });
    createdUser.id = createdUser.teacher_uid;
  }

  if (!createdUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not create an user with the data provided!",
      user: {},
    });
  }

  const token = createJWT(createdUser.fullname, createdUser.id, userType);
  await cacheJWT(token, req.cookies.uniqueIdentifier);

  return res.status(StatusCodes.CREATED).json({
    token,
    msg: `Successfully created user type:${userType}: ${createdUser.fullname}!`,
    user: createdUser,
  });
};

// LOGIN USER
const loginUser = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Precizați email-ul și parola!", user: {} });
  }

  const foundAdmin = await adminClient.findUnique({ where: { email } });
  const foundStudent = await studentClient.findUnique({ where: { email } });
  const foundTeacher = await teacherClient.findUnique({ where: { email } });

  const foundUser = foundAdmin || foundStudent || foundTeacher;

  if (!foundUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Nu am putut să găsim un cont cu email-ul:${email}!`,
      user: {},
    });
  }

  const foundUserId =
    foundAdmin?.admin_uid ||
    foundStudent?.student_uid ||
    foundTeacher?.teacher_uid;
  foundUser.id = foundUserId || "";

  const passwordsMatch = await verifyPassword(password, foundUser.password);

  if (!passwordsMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: `Parolă greșită!`, user: {} });
  }

  const token = createJWT(foundUser.fullname, foundUser.id, foundUser.role);
  await cacheJWT(token, req.cookies.uniqueIdentifier);

  return res.status(StatusCodes.OK).json({
    token,
    msg: `Successfully logged in ${foundUser.role} with email:${foundUser.email}!`,
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

// GET USER PROFILE
const getUserProfile = async (req: Request, res: Response) => {
  const foundUserId = req.user.userId;
  const foundUserType = req.user.userType;

  let userFound;
  if (foundUserType === "ADMIN") {
    userFound = await adminClient.findUnique({
      where: { admin_uid: foundUserId },
    });
  } else if (foundUserType === "ELEV") {
    userFound = await studentClient.findUnique({
      where: { student_uid: foundUserId },
    });
  } else if (foundUserType === "PROFESOR") {
    userFound = await teacherClient.findUnique({
      where: { teacher_uid: foundUserId },
    });
  }

  if (!userFound) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find user with type:${foundUserType} and id:${foundUserId}!`,
      user: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found user: ${userFound.fullname}.`,
    user: userFound,
  });
};

export { createUser, logoutUser, loginUser, getUserProfile };
