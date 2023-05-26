// Express
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

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
    from: emailForm.emailAddress,
    to: process.env.EMAIL_ADDRESS_USER,
    subject: emailForm.subject,
    text: emailForm.message,
  };

  const emailRes = await transporter.sendMail(mailOptions);

  if (emailRes.rejected.length === 1 && emailRes.accepted.length === 0) {
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Email-ul nu a putut fi trimis." });
  }

  return res
    .status(StatusCodes.OK)
    .json({ msg: "Am trimis email-ul cu success!" });
};

export { sendEmail };
