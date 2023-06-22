// Express
import { Request, Response } from "express";
// UUID
import { v4 } from "uuid";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Node Mailer
import * as nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
// Prisma
import { adminClient, studentClient, teacherClient } from "../db/postgres";
import { cachePassResetToken, getPassResetToken } from "../utils/redis";

const sendEmail = async (req: Request, res: Response) => {
  const emailForm = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS_USER,
      pass: process.env.EMAIL_ADDRESS_PASS,
    },
  });

  const mailOptions: MailOptions = {
    from: emailForm.emailAddress || "HSA API USER",
    to: process.env.EMAIL_ADDRESS_USER,
    subject: emailForm.subject || "Undefined Subject",
    text: emailForm.message || "Default message",
  };

  const emailRes = await transporter.sendMail(mailOptions);

  if (emailRes.rejected.length === 1 && emailRes.accepted.length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email-ul nu a putut fi trimis." });
  }

  return res
    .status(StatusCodes.OK)
    .json({ msg: "Am trimis email-ul cu success!" });
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
  await cachePassResetToken(randomToken);

  const siteUrl =
    process.env.NODE_ENV === "prouduction"
      ? "https://highschool-site-app-ca.netlify.app/reset-pass"
      : `http://localhost:3000/reset-pass`;

  const resetPassLink = `${siteUrl}?token=${randomToken}&type=${modelType}&accountId=${foundUser.id}`;

  const emailMessage = `Am primit o cerere de resetare a parolei pentru contul tău de ${modelType} din Highschool Site App. Pentru a continua procesul de resetare a parolei, te rugăm să dai click pe următorul link:
  ${resetPassLink}
Dacă nu ai solicitat această resetare a parolei, te rugăm să ignori acest email. Parola ta va rămâne neschimbată.
Te rugăm să reții că acest link pentru resetarea parolei este valabil timp de 2 ore. După expirarea acestui termen, va trebui să inițiezi din nou procesul de resetare a parolei.
  
 Mulțumim,
 Echipa Highschool Site App`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS_USER,
      pass: process.env.EMAIL_ADDRESS_PASS,
    },
  });

  const mailOptions: MailOptions = {
    from: "Highschool Site App <highschoolsiteapptest@gmail.com>",
    to: recipient,
    subject: "Resetare parolă",
    text: emailMessage,
  };

  const emailRes = await transporter.sendMail(mailOptions);

  if (emailRes.rejected.length === 1 && emailRes.accepted.length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email-ul nu a putut fi trimis." });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Am trimis email-ul cu success! \n Verifică mesajul primit la "${recipient}" pentru instrucțiuni!`,
  });
};

const verifyResetPassToken = async (req: Request, res: Response) => {
  const { token } = req.query;
  console.log(req.query);

  const foundToken = await getPassResetToken(token as string);

  if (!foundToken) {
    return res
      .status(StatusCodes.GONE)
      .json({ msg: "Could not find reset pass token or it expired." });
  }

  return res.status(StatusCodes.OK).json({ msg: "Reset pass token is valid." });
};

export { sendEmail, resetPasswordEmail, verifyResetPassToken };
