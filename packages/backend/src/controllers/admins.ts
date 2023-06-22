// Express
import { Request, Response } from "express";
// Prisma Types
import { Admin } from "@prisma/client";
// Others
import { StatusCodes } from "http-status-codes";
import * as uuid from "uuid";
import { encryptPassword } from "../utils/bcrypt";
// Prisma
import { adminClient } from "../db/postgres";

// ADD USER TO REQUEST(need feedback)
declare module "express-serve-static-core" {
  export interface Request {
    user: any;
    cookies: any;
  }
}

// GET ALL ADMINS
const getAllAdmins = async (req: Request, res: Response) => {
  const foundAdmins = await adminClient.findMany({});

  if (foundAdmins.length < 1) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Could not find any admins!", admins: [] });
  }

  return res.status(StatusCodes.OK).json({
    nbHits: foundAdmins.length,
    msg: `Successfully found ${foundAdmins.length} admins!`,
    admins: foundAdmins,
  });
};

// GET SINGLE ADMIN by ADMIN UID or JWT
const getAdminByIdOrJWT = async (req: Request, res: Response) => {
  const adminId =
    req.params.adminId === "false" || !req.params.adminId
      ? req.user.adminId
      : req.params.adminId;

  if (req.cookies.uniqueIdentifier === undefined) {
    const uniqueIdentifier = uuid.v4();
    res.cookie("uniqueIdentifier", uniqueIdentifier, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });
  }

  if (!adminId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please enter a adminId in the request params!",
      admin: {},
    });
  }

  const foundAdmin = await adminClient.findUnique({
    where: { admin_uid: adminId },
  });

  if (!foundAdmin) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find admins with id:${adminId}!`,
      admin: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully found admin:${foundAdmin.username}!`,
    admin: foundAdmin,
  });
};

// UPDATE ADMIN by ADMIN UID or JWT
const updateAdminByIdOrJWT = async (req: Request, res: Response) => {
  const adminId =
    req.params.adminId === "false" || !req.params.adminId
      ? req.user.adminId
      : req.params.adminId;

  const adminBody = req.body;

  if (adminBody.password && adminBody.password === "PAROLA") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Vă rog să introduceți altă parola în afară de PAROLA",
      admin: {},
    });
  }

  if (
    adminBody.password &&
    adminBody.passwordVer &&
    adminBody.password !== adminBody.passwordVer
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Introduceti parole identice!", admin: {} });
  }

  delete adminBody.passwordVer;

  if (adminBody.password) {
    const encryptedPassword = await encryptPassword(adminBody.password);
    adminBody.password = encryptedPassword;
  }

  if (!adminId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not any adminId in the request params!",
      admin: {},
    });
  }

  const updatedAdmin = await adminClient.update({
    where: { admin_uid: adminId },
    data: { ...adminBody },
  });

  if (!updatedAdmin) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find admins with id:${adminId} to update or the update body was invalid!`,
      admin: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully updated admin:${updatedAdmin.username}!`,
    admin: updatedAdmin,
  });
};

// DELETE ADMIN by ADMIN UID or JWT
const deleteAdminByIdOrJWT = async (req: Request, res: Response) => {
  const { adminId } = req.params;

  if (!adminId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Could not any adminId in the request params!",
      admin: {},
    });
  }

  const foundAdmin = await adminClient.findUnique({
    where: { admin_uid: adminId },
  });

  if (!foundAdmin) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Could not find an admin with id:${adminId}.`, admin: {} });
  }

  const deletedAdmin = await adminClient.delete({
    where: { admin_uid: adminId },
  });

  if (!deletedAdmin) {
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: `Could not find any admins to delete with the id:${adminId}!`,
      admin: {},
    });
  }

  return res.status(StatusCodes.OK).json({
    msg: `Successfully deleted admin:${deletedAdmin.username}!`,
    admin: deletedAdmin,
  });
};

// EXPORTS
export {
  getAdminByIdOrJWT,
  deleteAdminByIdOrJWT,
  getAllAdmins,
  updateAdminByIdOrJWT,
};
