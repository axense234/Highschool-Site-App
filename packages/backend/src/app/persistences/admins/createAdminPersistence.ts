// Prisma
import { Admin } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { adminClient } from "../../../db/postgres";
// Types
import { TemplateAdminType } from "../../../core/types/templateAdminType";
// Data
import { defaultBookmarksAdmin } from "../../../data";

const createAdminPersistence = async (
  adminBody: TemplateAdminType,
  createDefaultBookmarks: string
) => {
  if (createDefaultBookmarks === "true") {
    adminBody.bookmarks = { createMany: { data: defaultBookmarksAdmin } };
  }

  const createdAdmin = await adminClient.create({
    data: { ...(adminBody as Admin) },
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
