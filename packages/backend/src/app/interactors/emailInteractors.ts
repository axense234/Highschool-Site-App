// Express
import { Request, Response } from "express";
// UUID
import { v4 } from "uuid";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { setCache } from "utils/redis";
// Prisma
import { adminClient, studentClient, teacherClient } from "../../db/postgres";
// Data
import { resetPassEmailMessage, siteUrl } from "../../data";
// Persistences
import sendEmailPersistence from "../persistences/email/sendEmailPersistence";
import verifyResetPassTokenPersistence from "../persistences/email/verifyResetPassTokenPersistence";

const sendEmail = async (req: Request, res: Response) => {
  const emailForm = req.body;

  const sentEmailPayload = await sendEmailPersistence(emailForm);
  return res.status(sentEmailPayload.statusCode).json(sentEmailPayload);
};

const resetPasswordEmail = async (req: Request, res: Response) => {
  const { recipient, modelType } = req.body;

  let foundUser;
  if (modelType === "ADMIN") {
    foundUser = await adminClient.findUnique({ where: { email: recipient } });
    if (foundUser) {
      foundUser.id = foundUser.admin_uid;
    }
  } else if (modelType === "ELEV") {
    foundUser = await studentClient.findUnique({
      where: { email: recipient },
    });
    if (foundUser) {
      foundUser.id = foundUser.student_uid;
    }
  } else if (modelType === "PROFESOR") {
    foundUser = await teacherClient.findUnique({
      where: { email: recipient },
    });
    if (foundUser) {
      foundUser.id = foundUser.teacher_uid;
    }
  }

  if (!foundUser) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Nu am gasit niciun cont cu email: \n ${recipient}` });
  }

  const randomToken = v4();
  await setCache(`${foundUser.id}:hsa-pass-token`, randomToken);
  const resetPassLink = `${siteUrl}?token=${randomToken}&type=${modelType}&accountId=${foundUser.id}`;
  const emailMessage = resetPassEmailMessage(modelType, resetPassLink);

  const sentEmailPayload = await sendEmailPersistence({
    sender: "Highschool Site App <highschoolsiteapptest@gmail.com>",
    recipient,
    subject: "Resetare parolă",
    message: emailMessage,
  });

  return res.status(sentEmailPayload.statusCode).json(sentEmailPayload);
};

const verifyResetPassToken = async (req: Request, res: Response) => {
  const { token } = req.query;
  const verifyPassTokenPayload = await verifyResetPassTokenPersistence(
    token as string
  );
  return res
    .status(verifyPassTokenPayload.statusCode)
    .json(verifyPassTokenPayload);
};

export { sendEmail, resetPasswordEmail, verifyResetPassToken };
