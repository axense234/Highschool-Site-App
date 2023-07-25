// Express
import { Request, Response } from "express";
// Persistences
import getAllAdminsPersistence from "../persistences/admins/getAllAdminsPersistence";
import getAdminByIdPersistence from "../persistences/admins/getAdminByIdPersistence";
import updateAdminByIdPersistence from "../persistences/admins/updateAdminByIdPersistence";
import deleteAdminByIdPersistence from "../persistences/admins/deleteAdminByIdPersistence";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare module "express-serve-static-core" {
  export interface Request {
    user: any;
    cookies: any;
  }
}

const getAllAdmins = async (req: Request, res: Response) => {
  const foundAdminsPayload = await getAllAdminsPersistence();
  return res.status(foundAdminsPayload.statusCode).json(foundAdminsPayload);
};

const getAdminById = async (req: Request, res: Response) => {
  const adminId =
    req.params.userId === "false" || !req.params.userId
      ? req.user.userId
      : req.params.userId;

  const foundAdminPayload = await getAdminByIdPersistence(
    "admin_uid",
    adminId,
    "false"
  );
  return res.status(foundAdminPayload.statusCode).json(foundAdminPayload);
};

const updateAdminById = async (req: Request, res: Response) => {
  const adminId =
    req.params.adminId === "false" || !req.params.adminId
      ? req.user.adminId
      : req.params.adminId;

  const adminBody = req.body;

  const updatedAdminPayload = await updateAdminByIdPersistence(
    adminId,
    adminBody
  );

  return res.status(updatedAdminPayload.statusCode).json(updatedAdminPayload);
};

const deleteAdminById = async (req: Request, res: Response) => {
  const { adminId } = req.params;

  const deletedAdminPayload = await deleteAdminByIdPersistence(adminId);
  return res.status(deletedAdminPayload.statusCode).json(deletedAdminPayload);
};

// EXPORTS
export { getAdminById, deleteAdminById, getAllAdmins, updateAdminById };
