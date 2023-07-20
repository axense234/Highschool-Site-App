// Express
import { Request, Response } from "express";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Persistences
import notifyUserPersistence from "../persistences/notifications/notifyUserPersistence";
import getAdminByIdPersistence from "../persistences/admins/getAdminByIdPersistence";
import getStudentByIdPersistence from "../persistences/students/getStudentByIdPersistence";
import getTeacherByIdPersistence from "../persistences/teachers/getTeacherByIdPersistence";
// Templates
import { TemplateAdminType } from "../../core/types/templateAdminType";
import { TemplateStudentType } from "../../core/types/templateStudentType";
import { TemplateTeacherType } from "../../core/types/templateTeacherType";

const publicVapidKey = (process.env.PUBLIC_VAPID_KEY as string) || "";
const privateVapidKey = (process.env.PRIVATE_VAPID_KEY as string) || "";

const notifyUser = async (req: Request, res: Response) => {
  const { userId, userType } = req.params;
  const { notificationTitle, notificationMessage } = req.body;

  switch (userType) {
    case "ADMIN":
      const foundAdminPayload = await getAdminByIdPersistence(
        "admin_uid",
        userId,
        "false"
      );

      const foundAdmin =
        foundAdminPayload.statusCode === 200 && foundAdminPayload.admin;

      if (foundAdmin) {
        const notifiedUserPayload = await notifyUserPersistence(
          publicVapidKey,
          privateVapidKey,
          notificationTitle,
          notificationMessage,
          foundAdmin as TemplateAdminType
        );

        return res
          .status(notifiedUserPayload.statusCode)
          .json(notifiedUserPayload);
      }
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Could not find any admins with id: ${userId}.` });

    case "ELEV":
      const foundStudentPayload = await getStudentByIdPersistence(
        "student_uid",
        userId,
        "false",
        "false"
      );

      const foundStudent =
        foundStudentPayload.statusCode === 200 && foundStudentPayload.student;

      if (foundStudent) {
        const notifiedUserPayload = await notifyUserPersistence(
          publicVapidKey,
          privateVapidKey,
          notificationTitle,
          notificationMessage,
          foundStudent as TemplateStudentType
        );

        return res
          .status(notifiedUserPayload.statusCode)
          .json(notifiedUserPayload);
      }
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Could not find any students with id: ${userId}.` });

    case "PROFESOR":
      const foundTeacherPayload = await getTeacherByIdPersistence(
        "teacher_uid",
        userId,
        "false",
        "false"
      );

      const foundTeacher =
        foundTeacherPayload.statusCode === 200 && foundTeacherPayload.teacher;

      if (foundTeacher) {
        const notifiedUserPayload = await notifyUserPersistence(
          publicVapidKey,
          privateVapidKey,
          notificationTitle,
          notificationMessage,
          foundTeacher as TemplateTeacherType
        );

        return res
          .status(notifiedUserPayload.statusCode)
          .json(notifiedUserPayload);
      }
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Could not find any teachers with id: ${userId}.` });

    default:
      break;
  }
};

export { notifyUser };
