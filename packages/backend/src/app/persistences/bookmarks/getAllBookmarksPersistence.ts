// Status Codes
import { StatusCodes } from "http-status-codes";
// Utils
import { getOrSetCache } from "utils/redis";
// Client
import { bookmarkClient } from "../../../db/postgres";

const getAllBookmarksPersistence = async (
  filter: string,
  filterValue: string,
  userId: string
) => {
  const filterCondition = {} as any;
  filterCondition[filter] = filterValue;

  const foundBookmarks = await getOrSetCache("bookmarks", async () => {
    const bookmarks = await bookmarkClient.findMany({
      where: filterCondition,
    });
    return bookmarks;
  });

  if (foundBookmarks.length < 1) {
    return {
      msg: "Could not find any bookmarks, please try again later!",
      bookmarks: [],
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  return {
    msg: `Successfully found ${foundBookmarks.length} bookmarks!`,
    nbHits: foundBookmarks.length,
    bookmarks: foundBookmarks,
    statusCode: StatusCodes.OK,
  };
};

export default getAllBookmarksPersistence;
