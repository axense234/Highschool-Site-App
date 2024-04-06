// Express
import { Request, Response } from "express";
import { Admin, Student, StudentCard, Teacher } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
// Utils
import { setCache, deleteCache } from "utils/redis";
import { createJWT } from "../../utils/jwt";
// Prisma
import { classClient } from "../../db/postgres";
import { encryptPassword, verifyPassword } from "../../utils/bcrypt";
// Persistences
import createCardPersistence from "../persistences/cards/createCardPersistence";
import createAdminPersistence from "../persistences/admins/createAdminPersistence";
import createStudentPersistence from "../persistences/students/createStudentPersistence";
import createTeacherPersistence from "../persistences/teachers/createTeacherPersistence";
import getAdminByIdPersistence from "../persistences/admins/getAdminByIdPersistence";
import getStudentByIdPersistence from "../persistences/students/getStudentByIdPersistence";
import getTeacherByIdPersistence from "../persistences/teachers/getTeacherByIdPersistence";

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
    const createdUserPayload = await createAdminPersistence(userBody, "true");
    createdUser = createdUserPayload.admin as Admin;
    createdUser.id =
      createdUserPayload.statusCode === 201 ? createdUser.admin_uid : "";
  } else if (userType === "ELEV") {
    const createdCardPayload = await createCardPersistence();
    const card = createdCardPayload.card as StudentCard;

    if (createdCardPayload) {
      userBody.student_card_uid = card.student_card_uid;
      userBody.student_card = {
        connect: { student_card_uid: card.student_card_uid },
      };
    }

    const foundStudentClass = await classClient.findUnique({
      where: { label: userBody.class_label },
    });

    if (foundStudentClass) {
      userBody.class_uid = foundStudentClass.class_uid;
    }

    const createdUserPayload = await createStudentPersistence(
      userBody,
      "true",
      "true"
    );
    createdUser = createdUserPayload.student as Student;
    createdUser.id =
      createdUserPayload.statusCode === 201 ? createdUser.student_uid : "";
  } else if (userType === "PROFESOR") {
    if (userBody.classes) {
      delete userBody.classes;
    }

    const createdTeacherPayload = await createTeacherPersistence(
      userBody,
      "true"
    );
    createdUser = createdTeacherPayload.teacher as Teacher;
    createdUser.id =
      createdTeacherPayload.statusCode === 201 ? createdUser.teacher_uid : "";

    if (createdUser.master_class_label) {
      const foundClass = await classClient.findUnique({
        where: { label: createdUser.master_class_label },
      });

      if (foundClass) {
        userBody.master = true;

        await classClient.update({
          where: { class_uid: foundClass.class_uid },
          data: {
            master_teacher_name: createdUser.fullname,
            master_teacher_uid: createdUser.teacher_uid,
          },
        });
      }
    }
  }

  if (!createdUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not create an user with the data provided!",
      user: {},
    });
  }

  const token = createJWT(createdUser.fullname, createdUser.id, userType);
  await setCache(`${createdUser.id}:hsa-jwt`, token);

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
    const foundAdminPayload = await getAdminByIdPersistence(
      "email",
      email,
      "true"
    );
    if (foundAdminPayload.statusCode === 200) {
      userFound = foundAdminPayload.admin as Admin;
      userFound.id = userFound.admin_uid;
    }
  } else if (role === "ELEV") {
    const foundStudentPayload = await getStudentByIdPersistence(
      "email",
      email,
      "true",
      "false"
    );
    if (foundStudentPayload.statusCode === 200) {
      userFound = foundStudentPayload.student as Student;
      userFound.id = userFound.student_uid;
    }
  } else if (role === "PROFESOR") {
    const foundTeacherPayload = await getTeacherByIdPersistence(
      "email",
      email,
      "false",
      "false"
    );
    if (foundTeacherPayload.statusCode === 200) {
      userFound = foundTeacherPayload.teacher as Teacher;
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
  await setCache(`${userFound.id}:hsa-jwt`, token);

  return res.status(StatusCodes.OK).json({
    token,
    msg: `Successfully logged in ${userFound.role} with email:${userFound.email}!`,
    user: userFound,
  });
};

// LOG OUT USER
const logoutUser = async (req: Request, res: Response) => {
  const { userId } = req.user;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "No user id!", user: {} });
  }

  await deleteCache(`${userId}:hsa-jwt`);
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully logged out!", user: {} });
};

// GET USER PROFILE
const getUserProfile = async (req: Request, res: Response) => {
  const foundUserId = req.user.userId;
  const foundUserType = req.user.userType;

  if (foundUserType === "ADMIN") {
    const foundAdminPayload = await getAdminByIdPersistence(
      "admin_uid",
      foundUserId,
      "true"
    );
    if (foundAdminPayload.statusCode === 200) {
      const userFound = foundAdminPayload.admin as Admin;
      userFound.id = userFound.admin_uid;
      return res.status(StatusCodes.OK).json({
        msg: `Successfully found admin: ${userFound.fullname}.`,
        user: userFound,
      });
    }
  } else if (foundUserType === "ELEV") {
    const foundStudentPayload = await getStudentByIdPersistence(
      "student_uid",
      foundUserId,
      "true",
      "true"
    );
    if (foundStudentPayload.statusCode === 200) {
      const userFound = foundStudentPayload.student as Student;
      userFound.id = userFound.student_uid;
      return res.status(StatusCodes.OK).json({
        msg: `Successfully found student: ${userFound.fullname}.`,
        user: userFound,
      });
    }
  } else if (foundUserType === "PROFESOR") {
    const foundTeacherPayload = await getTeacherByIdPersistence(
      "teacher_uid",
      foundUserId,
      "false",
      "true"
    );
    if (foundTeacherPayload.statusCode === 200) {
      const userFound = foundTeacherPayload.teacher as Teacher;
      userFound.id = userFound.teacher_uid;
      return res.status(StatusCodes.OK).json({
        msg: `Successfully found teacher: ${userFound.fullname}.`,
        user: userFound,
      });
    }
  }

  return res.status(StatusCodes.NOT_FOUND).json({
    msg: `Could not find user with type:${foundUserType} and id:${foundUserId}!`,
    user: {},
  });
};

export { createUser, logoutUser, loginUser, getUserProfile };
