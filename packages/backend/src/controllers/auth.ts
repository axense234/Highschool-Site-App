// Express
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
// Prisma
import {
  adminClient,
  studentCardClient,
  studentClient,
  teacherClient,
} from "../db/postgres";
import { encryptPassword, verifyPassword } from "../utils/bcrypt";
// Utils
import { createJWT } from "../utils/jwt";
import { cacheJWT, deleteCachedJWT } from "../utils/redis";
// Data
import { defaultSubjects } from "../data";

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
    const createdStudentCard = await studentCardClient.create({
      data: {
        content: {
          createMany: {
            data: [
              { subject: defaultSubjects[0] },
              { subject: defaultSubjects[1] },
              { subject: defaultSubjects[2] },
              { subject: defaultSubjects[3] },
              { subject: defaultSubjects[4] },
              { subject: defaultSubjects[5] },
              { subject: defaultSubjects[6] },
              { subject: defaultSubjects[7] },
              { subject: defaultSubjects[8] },
              { subject: defaultSubjects[9] },
              { subject: defaultSubjects[10] },
              { subject: defaultSubjects[11] },
              { subject: defaultSubjects[12] },
              { subject: defaultSubjects[13] },
              { subject: defaultSubjects[14] },
              { subject: defaultSubjects[15] },
              { subject: defaultSubjects[16] },
              { subject: defaultSubjects[17] },
            ],
          },
        },
      },
    });
    userBody.student_card_uid = createdStudentCard.student_card_uid;
    userBody.student_card = {
      connect: { student_card_uid: createdStudentCard.student_card_uid },
    };
    createdUser = await studentClient.create({
      data: { ...userBody },
      include: {
        student_card: {
          include: { content: { include: { absences: true, grades: true } } },
        },
      },
    });
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
  const { password, email, role } = req.body;

  if (!password || !email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Precizați email-ul și parola!", user: {} });
  }

  let userFound;
  if (role === "ADMIN") {
    userFound = await adminClient.findUnique({
      where: { email },
    });
    if (userFound) {
      userFound.id = userFound.admin_uid;
    }
  } else if (role === "ELEV") {
    userFound = await studentClient.findUnique({
      where: { email },
    });
    if (userFound) {
      userFound.id = userFound.student_uid;
    }
  } else if (role === "PROFESOR") {
    userFound = await teacherClient.findUnique({
      where: { email },
    });
    if (userFound) {
      userFound.id = userFound.teacher_uid;
    }
  }

  if (!userFound) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Nu am putut să găsim un cont cu email-ul:${email}!`,
      user: {},
    });
  }

  const passwordsMatch = await verifyPassword(password, userFound.password);

  if (!passwordsMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: `Parolă greșită!`, user: {} });
  }

  const token = createJWT(userFound.fullname, userFound.id, userFound.role);
  await cacheJWT(token, req.cookies.uniqueIdentifier);

  return res.status(StatusCodes.OK).json({
    token,
    msg: `Successfully logged in ${userFound.role} with email:${userFound.email}!`,
    user: userFound,
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
      include: { student_card: { include: { content: true } } },
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
