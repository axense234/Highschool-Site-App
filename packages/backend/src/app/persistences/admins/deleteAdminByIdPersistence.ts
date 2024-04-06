// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache } from "utils/redis";
// Client
import { adminClient } from "../../../db/postgres";

const deleteAdminByIdPersistence = async (adminId: string) => {
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
      msg: `Could not find an admin with id:${adminId}.`,
      admin: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  const deletedAdmin = await adminClient.delete({
    where: { admin_uid: adminId },
  });

  if (!deletedAdmin) {
    return {
      msg: `Could not find any admins to delete with the id:${adminId}!`,
      admin: {},
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  await deleteCache("admins");
  await deleteCache(`admins:${deletedAdmin.admin_uid}`);

  return {
    msg: `Successfully deleted admin:${deletedAdmin.fullname}!`,
    admin: deletedAdmin,
    statusCode: StatusCodes.OK,
  };
};

export default deleteAdminByIdPersistence;
