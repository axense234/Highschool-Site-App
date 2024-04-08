// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { getOrSetCache } from "../../../utils/redis";
// Client
import { adminClient } from "../../../db/postgres";

const getAdminByIdPersistence = async (
  filter: string,
  filterValue: string,
  includeBookmarks: string
) => {
  const includeObject = {} as any;
  const filterCondition = {} as any;
  filterCondition[filter] = filterValue;

  includeObject.bookmarks = Boolean(includeBookmarks);

  const foundAdmin = await getOrSetCache(`admins:${filterValue}`, async () => {
    const admin = await adminClient.findUnique({
      where: filterCondition,
      include: includeObject,
    });
    return admin;
  });

  if (!foundAdmin) {
    return {
      msg: `Could not find admins with ${filter}:${filterValue}!`,
      admin: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    msg: `Successfully found admin:${foundAdmin.fullname}!`,
    admin: foundAdmin,
    statusCode: StatusCodes.OK,
  };
};

export default getAdminByIdPersistence;
