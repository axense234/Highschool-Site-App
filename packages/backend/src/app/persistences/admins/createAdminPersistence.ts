// Prisma
import { Admin } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { adminClient } from "../../../db/postgres";

const createAdminPersistence = async (adminBody: Admin) => {
  const createdAdmin = await adminClient.create({
    data: { ...adminBody },
  });

  if (!createdAdmin) {
    return {
      msg: `Something went wrong while creating an admin!`,
      admin: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  return {
    msg: `Successfully created an admin with id:${createdAdmin.admin_uid}`,
    admin: createdAdmin,
    statusCode: StatusCodes.OK,
  };
};

export default createAdminPersistence;
