// Node Mailer
import * as nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Config
import transporterConfig from "../../../config/transporterConfig";
// Types
import type { EmailFormType } from "../../../core/types/emailFormType";

const sendEmailPersistence = async (emailForm: EmailFormType) => {
  const transporter = nodemailer.createTransport(transporterConfig);

  const mailOptions: MailOptions = {
    from: emailForm.sender || "HSA API USER",
    to: process.env.EMAIL_ADDRESS_USER,
    subject: emailForm.subject || "Undefined Subject",
    text: emailForm.message || "Default message",
  };

  const emailRes = await transporter.sendMail(mailOptions);

  if (emailRes.rejected.length === 1 && emailRes.accepted.length === 0) {
    return {
      msg: "Email-ul nu a putut fi trimis.",
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  return { msg: "Am trimis email-ul cu success!", statusCode: StatusCodes.OK };
};

export default sendEmailPersistence;
