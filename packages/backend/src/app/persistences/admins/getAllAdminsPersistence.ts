// Status Codes
import { StatusCodes } from "http-status-codes";
// Client
import { adminClient } from "../../../db/postgres";

const getAllAdminsPersistence = async () => {
  const foundAdmins = await adminClient.findMany({});

  if (foundAdmins.length < 1) {
    return {
      msg: "Could not find any admins!",
      admins: [],
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    nbHits: foundAdmins.length,
    msg: `Successfully found ${foundAdmins.length} admins!`,
    admins: foundAdmins,
    statusCode: StatusCodes.OK,
  };
};

export default getAllAdminsPersistence;
