// Prisma
import { Admin } from "@prisma/client";
// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { deleteCache, setCache } from "../../../utils/redis";
// Types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type TemplateAdminType from "../../../core/types/TemplateAdminType";
// Client
import { adminClient } from "../../../db/postgres";
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

  await deleteCache("admins");
  await setCache(`admins:${createdAdmin.admin_uid}`, createdAdmin);

  return {
    msg: `Successfully created an admin with id:${createdAdmin.admin_uid}`,
    admin: createdAdmin,
    statusCode: StatusCodes.CREATED,
  };
};

export default createAdminPersistence;
