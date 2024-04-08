// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { getOrSetCache } from "../../../utils/redis";
// Client
import { bookmarkClient } from "../../../db/postgres";

const getBookmarkByIdPersistence = async (
  bookmarkId: string,
  userId: string
) => {
  if (!bookmarkId) {
    return {
      msg: "Please enter a valid bookmark id!",
      bookmark: {},
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  const foundBookmark = await getOrSetCache(
    `${userId}:bookmarks:${bookmarkId}`,
    async () => {
      const bookmark = await bookmarkClient.findUnique({
        where: { bookmark_uid: bookmarkId },
      });
      return bookmark;
    }
  );

  if (!foundBookmark) {
    return {
      msg: `Could not find any bookmarks with the following id:${bookmarkId}!`,
      bookmark: {},
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    msg: `Successfully found a boomark with id:${bookmarkId}!`,
    bookmark: foundBookmark,
    statusCode: StatusCodes.OK,
  };
};

export default getBookmarkByIdPersistence;
