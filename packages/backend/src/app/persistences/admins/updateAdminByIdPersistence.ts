// Prisma
import { Admin } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { encryptPassword } from "../../../utils/bcrypt";
// Client
import { adminClient } from "../../../db/postgres";
// Interfaces
import { TemplateAdminType } from "../../../core/types/TemplateAdminType";

const updateAdminByIdPersistence = async (
  adminId: string,
  adminBody: TemplateAdminType
) => {
  if (adminBody.password) {
    const encryptedPassword = await encryptPassword(adminBody.password);
    adminBody.password = encryptedPassword;
  }

  if (adminBody.bookmarks) {
    delete adminBody.bookmarks;
  }

  if (!adminId) {
    return {
      msg: "Could not any adminId in the request params!",
      admin: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const foundAdmin = await adminClient.findUnique({
    where: { admin_uid: adminId },
  });

  if (!foundAdmin) {
    return {
      msg: `Could not find admins with id:${adminId} to update!`,
      admin: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  const updatedAdmin = await adminClient.update({
    where: { admin_uid: adminId },
    data: { ...(adminBody as Admin) },
  });

  if (!updatedAdmin) {
    return {
      msg: `Could not find admins with id:${adminId} to update or the update body was invalid!`,
      admin: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    msg: `Successfully updated admin:${updatedAdmin.fullname}!`,
    admin: updatedAdmin,
    statusCode: StatusCodes.OK,
  };
};

export default updateAdminByIdPersistence;
